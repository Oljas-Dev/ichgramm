import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  modal: string;
}

const initialState: ModalState = {
  modal: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
      state.modal = action.payload;
    },

    closeModal: (state) => {
      state.modal = "";
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
