import { Flex } from "antd";
import styled from "styled-components";

import heartImg from "./../../assets/heart.svg";
import commentImg from "./../../assets/comment.svg";
import { useAppDispatch } from "../../hooks/hooks";
import { setModal } from "../../redux/slices/modalSlice";
import { fetchPostById } from "../../redux/slices/postsLoader";

const LikesContainer = styled(Flex)`
  padding-top: 0.625rem; // 10px

  button {
    background-color: transparent;
  }
`;

export default function LikesGroup({ id }: { id?: string | undefined }) {
  const dispatch = useAppDispatch();

  function handleComment(id: string | undefined) {
    if(!id) return null;
    dispatch(setModal("currentPost"));
    dispatch(fetchPostById(id));
  }
  return (
    <LikesContainer vertical gap={11}>
      <Flex gap={14}>
        <button>
          <img src={heartImg} alt="heart icon" />
        </button>

        <button onClick={() => handleComment(id)}>
          <img src={commentImg} alt="comment icon" />
        </button>
      </Flex>
    </LikesContainer>
  );
}
