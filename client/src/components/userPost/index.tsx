import { Flex } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "../../redux/slices/postsLoader";
import ProfileRow from "../profileRow";
import LikesGroup from "../likesGroup";

dayjs.extend(relativeTime);

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
        <ProfileRow
          name={post.user.username}
          follow={!myPost}
          createdAt={post.user.createdAt}
        />
        <PostImage
          src={`http://localhost:3333${post.image}`}
          alt={`post-${i}`}
        />
      </Flex>

      <LikesGroup />

      {post?.likes && <SmallBoldText>{post.likes} likes</SmallBoldText>}

      <UserDescription gap={8} align="center">
        <SmallBoldText>{post.user.username}</SmallBoldText>
        <p>{post.description}</p>
      </UserDescription>
    </UserPostContainer>
  );
}
