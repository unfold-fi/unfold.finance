import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import web3Service from '../../../../api/web3';
import {
  showError,
  showPending,
  showTxPending,
  trackTransaction,
} from '../alert';
import config from '../../../../config';

export const getAccountDataRequest = createAsyncThunk(
  'web3/getAccountData',
  async ({ account, library }, { rejectWithValue, dispatch }) => {
    try {
      const response = await web3Service.getUserData({ account }, library);
      return response;
    } catch (e) {
      const { status, statusText } = e;
      dispatch(showError(statusText));
      return rejectWithValue({ status, statusText });
    }
  },
);

export const approveTokenRequest = createAsyncThunk(
  'web3/approveToken',
  async ({ vault, library }, { getState, rejectWithValue, dispatch }) => {
    const { account } = getState().web3;

    try {
      const response = await web3Service.approveTokenTx(
        { account, vault },
        library,
      );

      dispatch(
        showTxPending({
          hash: response.tx.hash,
          message: `Approve ${vault.tokenSymbol} pending...`,
        }),
      );

      trackTransaction({
        hash: response.tx.hash,
        message: `${vault.tokenSymbol} approved`,
        provider: library,
        dispatch,
        callback: async () => {
          dispatch(getAccountDataRequest({ account, library }));
        },
      });

      return true;
    } catch (e) {
      const { status, statusText } = e;
      dispatch(showError(statusText));
      return rejectWithValue({ status, statusText });
    }
  },
);

export const depositTokenRequest = createAsyncThunk(
  'web3/depositToken',
  async (
    { vault, amount, library },
    { getState, rejectWithValue, dispatch },
  ) => {
    const { account } = getState().web3;

    try {
      const response = await web3Service.depositTokenTx(
        { account, vault, amount },
        library,
      );

      dispatch(
        showTxPending({
          hash: response.tx.hash,
          message: `Deposit ${amount} ${vault.tokenSymbol} pending...`,
        }),
      );

      trackTransaction({
        hash: response.tx.hash,
        message: `${amount} ${vault.tokenSymbol} deposited`,
        provider: library,
        dispatch,
        callback: async () => {
          dispatch(getAccountDataRequest({ account, library }));
        },
      });

      return true;
    } catch (e) {
      const { status, statusText } = e;
      dispatch(showError(statusText));
      return rejectWithValue({ status, statusText });
    }
  },
);

export const withdrawTokenRequest = createAsyncThunk(
  'web3/withdrawToken',
  async (
    { vault, amount, library },
    { getState, rejectWithValue, dispatch },
  ) => {
    const { account } = getState().web3;

    try {
      const response = await web3Service.withdrawTokenTx(
        { account, vault, amount },
        library,
      );

      dispatch(
        showTxPending({
          hash: response.tx.hash,
          message: `Withdraw ${amount} ${vault.tokenSymbol} pending...`,
        }),
      );

      trackTransaction({
        hash: response.tx.hash,
        message: `${amount} ${vault.tokenSymbol} withdrawn`,
        provider: library,
        dispatch,
        callback: async () => {
          dispatch(getAccountDataRequest({ account, library }));
        },
      });

      return true;
    } catch (e) {
      const { status, statusText } = e;
      dispatch(showError(statusText));
      return rejectWithValue({ status, statusText });
    }
  },
);

const vaults = config.Vaults.reduce((result, vault) => {
  if (vault.enabled) {
    result.set(vault.name, {
      apy: 0,
      locked: 0,
      stake: 0,
      reward: 0,
      approved: false,
    });
  }
  return result;
}, new Map());

const initialState = {
  loading: false,
  error: null,
  account: null,
  image: null,
  ethBalance: 0,
  vaults: Object.fromEntries(vaults),
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountDataRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountDataRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.account = action.payload.account;
      state.image = action.payload.image;
      state.ethBalance = action.payload.ethBalance;
      if (action.payload.vaults) {
        for (const vault of action.payload.vaults) {
          state.vaults[vault.name].locked = vault.locked;
          state.vaults[vault.name].stake = vault.stake;
          state.vaults[vault.name].reward = vault.reward;
          state.vaults[vault.name].approved = vault.approved;
        }
      }
      //
    });
    builder.addCase(getAccountDataRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default web3Slice.reducer;
