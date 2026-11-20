import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ModalObject {
  open: boolean;
  name: string;
}

interface ModalState {
  modal: ModalObject;
}

const initialState: ModalState = {
  modal: {
    open: false,
    name: "",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
      state.modal.name = action.payload;
      state.modal.open = true;
    },

    closeModal: (state) => {
      state.modal.name = "";
      state.modal.open = false;
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
