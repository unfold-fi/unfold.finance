import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import web3Service from '../../../../api/web3';

export const getAccountDataRequest = createAsyncThunk(
  'web3/getAccountData',
  async ({ account, library }, { rejectWithValue, dispatch }) => {
    try {
      const response = await web3Service.getUserData({ account }, library);
      return response;
    } catch (e) {
      const { status, statusText } = e;
      //dispatch(showError(statusText));
      return rejectWithValue({ status, statusText });
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  account: null,
  image: null,
  ethBalance: 0,
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
    });
    builder.addCase(getAccountDataRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default web3Slice.reducer;
