import type { MouseEvent } from "react";

import { Outlet } from "react-router-dom";
import { MainContainer, ModalBackdrop } from "../../styles/common";
import LeftNavPanel from "../../components/leftNavPanel";
import Footer from "../../components/footer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";
import CreatePost from "./create-post";
// import CurrentPostMenu from "../../components/currentPostMenu";
import CurrentPost from "../../components/currentPost";

export default function Applayout() {
  const currentModal = useAppSelector((state) => state.modal.modal);
  const dispatch = useAppDispatch();

  function close(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  }

  return (
    <MainContainer>
      <LeftNavPanel />
      <Outlet />
      <Footer />

      <ModalBackdrop $show={currentModal.open} $column="2" onClick={close}>
        {(currentModal.name === "Create" && <CreatePost />) ||
          // (currentModal.name === "postMenu" && <CurrentPostMenu />) ||
          (currentModal.name === "currentPost" && <CurrentPost />)}
      </ModalBackdrop>
    </MainContainer>
  );
}
