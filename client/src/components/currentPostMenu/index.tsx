import { Flex, Modal } from "antd";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";
import {
  deletePost,
  fetchProfilePage,
} from "../../redux/functions/postFunctions";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/slices/modalSlice";
import { useParams } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

const Container = styled(Flex)`
  width: 100%;
  height: 60%;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-sm);
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  min-width: 400px;
  border-radius: 12px;

  li {
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid var(--gray-border);
    cursor: pointer;

    &:hover {
      font-weight: 700;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

export default function CurrentPostMenu({
  postId,
  close,
  onFinish,
}: {
  postId: string | undefined;
  close: (e: React.MouseEvent<HTMLLIElement>) => void;
  onFinish: Dispatch<SetStateAction<boolean>>;
}) {
  const [modal, contextHolder] = Modal.useModal();
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const deletePostById = (postId: string | undefined) => {
    dispatch(deletePost(postId)).unwrap();
    dispatch(closeModal());
    onFinish(false);

    toast.success("Post was deleted");
    dispatch(fetchProfilePage(userId));
  };

  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this post?",
      okText: "yes",
      cancelText: "cancel",
      onOk: () => deletePostById(postId),
    });
  };

  return (
    <Container justify="center" align="center" onClick={close}>
      {contextHolder}

      <StyledUl>
        <li style={{ color: "rgba(237, 73, 86, 1)" }} onClick={confirm}>
          Delete
        </li>
        <li>Edit</li>
        <li>Go to post</li>
        <li>Copy link</li>
        <li onClick={close}>Cancel</li>
      </StyledUl>
    </Container>
  );
}
