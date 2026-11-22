import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styled from "styled-components";
import { Flex } from "antd";

import { setModal } from "../../redux/slices/modalSlice";
import { dislikePost, likePost } from "../../redux/functions/likeFuntions";
import { fetchPostById } from "../../redux/functions/postFunctions";
import type { LikeTypes } from "../../redux/slices/likeSlice";

import heartImg from "./../../assets/heart.svg";
import commentImg from "./../../assets/comment.svg";
import redHeart from "./../../assets/red_heart_comment.svg";

const LikesContainer = styled(Flex)`
  padding-top: 0.625rem; // 10px

  button {
    background-color: transparent;
  }
`;

export default function LikesGroup({
  id,
  likes,
  render,
}: {
  id?: string | undefined;
  likes?: LikeTypes[];
  render: () => Promise<unknown>;
}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.data?._id);

  const likedByMe = Array.isArray(likes)
    ? likes.some((like) => like.likedBy === userId)
    : false;

  function handleComment(id: string | undefined) {
    if (!id) return null;
    dispatch(setModal("currentPost"));
    dispatch(fetchPostById(id));
  }

  async function handleLike() {
    if (!id) return;
    await dispatch(likePost(id));
    await render();
  }

  async function handleDislike() {
    if (!id) return;
    await dispatch(dislikePost(id));
    await render();
  }

  return (
    <LikesContainer vertical gap={11}>
      <Flex gap={14}>
        {likedByMe ? (
          <button onClick={handleDislike}>
            <img src={redHeart} alt="heart icon" width={21} />
          </button>
        ) : (
          <button onClick={handleLike}>
            <img src={heartImg} alt="heart icon" />
          </button>
        )}

        <button onClick={() => handleComment(id)}>
          <img src={commentImg} alt="comment icon" />
        </button>
      </Flex>
    </LikesContainer>
  );
}
