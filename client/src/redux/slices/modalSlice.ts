import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalTypes } from "../../types/projectTypes";

interface ModalObject {
  open: boolean;
  name: ModalTypes;
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
    setModal: (state, action: PayloadAction<ModalTypes>) => {
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
