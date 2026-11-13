import { Flex } from "antd";
import styled from "styled-components";
import type { Post } from "../../redux/slices/postsLoader";
import ProfileRow from "../profileRow";

import heartImg from "./../../assets/heart.svg";
import commentImg from "./../../assets/comment.svg";

const UserPostContainer = styled.div`
  max-height: fit-content;
  padding-bottom: 2.375rem;
  border-bottom: 1px solid var(--gray-border);
`;

const PostImage = styled.img`
  width: 403px;
  height: 503px;
  object-fit: cover;
  object-position: center;
`;

const LikesContainer = styled(Flex)`
  padding-top: 0.625rem;
`;

const SmallBoldText = styled.h5`
  font-size: var(--font-size-xs);
  font-weight: 600;
`;

const UserDescription = styled(Flex)`
  font-size: var(--font-size-xs);
  padding-top: 0.5rem;

  p {
    font-family: "STIX Two Math", serif;
  }
`;

export default function UserPost({
  post,
  myPost,
  i,
}: {
  post: Post;
  myPost: boolean;
  i: number;
}) {
  return (
    <UserPostContainer>
      <Flex vertical gap={8}>
        <ProfileRow name={post.user.username} follow={!myPost} />
        <PostImage
          src={`http://localhost:3333${post.image}`}
          alt={`post-${i}`}
        />
      </Flex>

      <LikesContainer vertical gap={11}>
        <Flex gap={14}>
          <button>
            <img src={heartImg} alt="heart icon" />
          </button>

          <button>
            <img src={commentImg} alt="comment icon" />
          </button>
        </Flex>
      </LikesContainer>

      {post?.likes && <SmallBoldText>{post.likes} likes</SmallBoldText>}

      <UserDescription gap={8} align="center">
        <SmallBoldText>{post.user.username}</SmallBoldText>
        <p>{post.description}</p>
      </UserDescription>
    </UserPostContainer>
  );
}
