import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalTypes } from "../../types/projectTypes";

interface ModalObject {
  open: boolean;
  name: ModalTypes;
}

type MenuTypes = "home" | "explore" | "messages" | "notifications" | "profile";

interface ModalState {
  modal: ModalObject;
  page: ModalTypes | MenuTypes;
  prevPage: ModalTypes | MenuTypes;
}

const initialState: ModalState = {
  modal: {
    open: false,
    name: "",
  },
  page: "home",
  prevPage: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalTypes>) => {
      state.modal.name = action.payload;
      state.modal.open = true;
    },

    setPage: (state, action) => {
      state.page = action.payload.next;
      state.prevPage = action.payload.current;
    },

    closeModal: (state) => {
      state.page = state.prevPage;
      state.modal.name = "";
      state.modal.open = false;
    },
  },
});

export const { setModal, closeModal, setPage } = modalSlice.actions;
export default modalSlice.reducer;
