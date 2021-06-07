import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    modalOpen: false,
  },
  reducers: {
    showModal(state) {
      state.modalOpen = true;
    },
    closeModal(state, action) {
      state.modalOpen = false;
    },
  },
});

export const { showModal, closeModal } = connectionSlice.actions;

export default connectionSlice.reducer;
