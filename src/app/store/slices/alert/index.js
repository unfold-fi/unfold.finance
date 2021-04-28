/* eslint no-plusplus: "off" */

import { createSlice } from '@reduxjs/toolkit';

export const AlertType = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  TX_PENDING: 'TX_PENDING',
  TX_MINED: 'TX_MINED',
};

let idCounter = 0;

const createAlertId = () => ++idCounter;

const createInitialState = () => ({
  collection: {},
});

export const createAlert = (type, message) => ({
  id: createAlertId(),
  type,
  message,
});

export const createTxAlert = (type, message, hash) => ({
  id: createAlertId(),
  type,
  message,
  hash,
});

export const trackTransaction = async ({
  hash,
  message,
  provider,
  dispatch,
  callback,
}) => {
  try {
    provider.once(hash, () => {
      dispatch(
        showTxMined({
          message,
          hash,
        }),
      );
      if (callback) {
        callback();
      }
    });
    return true;
  } catch (e) {
    const { statusText } = e;
    dispatch(showError(statusText));
  }
  return false;
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: createInitialState(),
  reducers: {
    showInfo(state, action) {
      const alert = createAlert(AlertType.INFO, action.payload);
      state.collection[alert.id] = alert;
    },
    showError(state, action) {
      const alert = createAlert(AlertType.ERROR, action.payload);
      state.collection[alert.id] = alert;
    },
    showSuccess(state, action) {
      const alert = createAlert(AlertType.SUCCESS, action.payload);
      state.collection[alert.id] = alert;
    },
    showPending(state, action) {
      const alert = createAlert(AlertType.PENDING, action.payload);
      state.collection[alert.id] = alert;
    },
    showTxPending(state, action) {
      const alert = createTxAlert(
        AlertType.TX_PENDING,
        action.payload.message,
        action.payload.hash,
      );
      state.collection[alert.id] = alert;
    },
    showTxMined(state, action) {
      const alert = createTxAlert(
        AlertType.TX_MINED,
        action.payload.message,
        action.payload.hash,
      );
      state.collection[alert.id] = alert;
    },
    close(state, action) {
      const alert = state.collection[action.payload];

      if (alert) {
        alert.closed = true;
      }
    },
  },
});

export const {
  showInfo,
  showError,
  showSuccess,
  showPending,
  showTxPending,
  showTxMined,
  close,
} = alertSlice.actions;

export default alertSlice.reducer;
