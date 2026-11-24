import { Flex } from "antd";
import styled from "styled-components";
import { CurrentDescription } from "../currentPost/styles";
import Avatar from "../avatar";
import { TextGray } from "../../styles/common";

import redHeart from "./../../assets/red_heart_comment.svg";
import blankHeart from "./../../assets/blank_heart_comment.svg";
import type { commentsTypes } from "../../types/projectTypes";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";

const Comment = styled(CurrentDescription)`
  grid-column: span 2;
  width: 100%;
  max-height: fit-content;
`;

const CommentInfo = styled(Flex)`
  max-height: fit-content;
`;

export default function PostComments({ comment }: { comment: commentsTypes }) {
  const dispatch = useAppDispatch();
  return (
    <Comment>
      <Link
        to={`/profile/${comment.commentBy._id}`}
        onClick={() => dispatch(closeModal())}
      >
        <Avatar user={comment.commentBy} size="28px" />
      </Link>

      <CommentInfo justify="space-between" align="center">
        <Flex vertical gap={8}>
          <p>
            <strong>{comment.commentBy?.username} </strong>
            {comment.comment}
          </p>
          <Flex gap={16}>
            <TextGray>{comment.createdAt}</TextGray>
            <TextGray>Likes: {comment.likes}</TextGray>
          </Flex>
        </Flex>

        <img src={comment.myLike ? redHeart : blankHeart} alt="likes icon" />
      </CommentInfo>
    </Comment>
  );
}
