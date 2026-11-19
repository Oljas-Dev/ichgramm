import { Flex } from "antd";
import styled from "styled-components";
import { CurrentDescription } from "../currentPost/styles";
import Avatar from "../avatar";
import { TextGray } from "../../styles/common";

import redHeart from "./../../assets/red_heart_comment.svg";
import blankHeart from "./../../assets/blank_heart_comment.svg";
import type { User } from "../../redux/slices/getUserSlice";

// {
//       comment: "😍 спасибо!!!! 👏",
//       user: {
//         username: "coach.tonia",
//         fullname: "coach",
//         id: "1234",
//       },
//       likes: 1,
//       myLike: true,
//       createdAt: "17h",
//     },

interface CommentTypes {
  comment: string;
  likes: number;
  myLike?: boolean;
  createdAt: string;
  user: User | null;
}

const Comment = styled(CurrentDescription)`
  grid-column: span 2;
  width: 100%;
  max-height: fit-content;
  // border-top: 1px solid var(--gray-border);
`;

const CommentInfo = styled(Flex)`
  max-height: fit-content;
`;

export default function PostComments({ comment }: { comment: CommentTypes }) {
  return (
    <Comment>
      <Avatar user={comment.user} size="28px" />

      <CommentInfo justify="space-between" align="center">
        <Flex vertical gap={8}>
          <p>
            <strong>{comment.user?.username} </strong>
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
