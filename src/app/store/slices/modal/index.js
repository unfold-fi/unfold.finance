/* eslint no-plusplus: "off" */

import { createSlice } from '@reduxjs/toolkit';
import config from '../../../../config';

export const ModalType = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
  CLAIM: 'Claim',
};

const initialState = {
  open: false,
  type: ModalType.DEPOSIT,
  title: '',
  symbol: '',
  balance: '0.0',
  vault: undefined,
  action1Text: '',
  action2Text: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      const type = action.payload.type;
      const symbol =
        type === ModalType.CLAIM
          ? config.Contracts.ERC20.tokenSymbol
          : action.payload.symbol;

      state.type = type;
      state.title = `${type} ${symbol}`;
      state.symbol = symbol;
      state.balance = action.payload.balance;
      state.vault = action.payload.vault;

      switch (type) {
        case ModalType.WITHDRAW:
          state.action1Text = 'Withdraw';
          state.action2Text = 'Exit';
          break;

        default:
          state.action1Text = 'Confirm';
          break;
      }

      state.open = true;
    },
    closeModal(state, action) {
      state.open = false;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
