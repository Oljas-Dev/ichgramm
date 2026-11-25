import { Flex } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { type Post } from "../../redux/slices/postsSlice";
import ProfileRow from "../profileRow";
import LikesGroup from "../likesGroup";
import { useAppDispatch } from "../../hooks/hooks";
import { setModal } from "../../redux/slices/modalSlice";
import {
  fetchAllPosts,
  fetchPostById,
} from "../../redux/functions/postFunctions";

dayjs.extend(relativeTime);

const UserPostContainer = styled.div`
  max-height: fit-content;
  padding-bottom: 2.375rem;
  border-bottom: 1px solid var(--gray-border);
`;

const PostImageContainer = styled.div`
  cursor: pointer;
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
  myPost: boolean | undefined;
  i: number;
}) {
  const dispatch = useAppDispatch();
  const likes = post?.likes;

  function openPost(id: string) {
    dispatch(fetchPostById(id));
    dispatch(setModal("currentPost"));
  }

  return (
    <UserPostContainer>
      <Flex vertical gap={8}>
        <ProfileRow
          post={post}
          followOption={!myPost}
          createdAt={post.user.createdAt}
          userId={post.user._id}
        />
        <PostImageContainer onClick={() => openPost(post._id)}>
          <PostImage
            src={`http://localhost:3333${post.image}`}
            alt={`post-${i}`}
          />
        </PostImageContainer>
      </Flex>

      <LikesGroup
        id={post._id}
        likes={likes}
        render={() => dispatch(fetchAllPosts("posts"))}
      />

      {likes?.length > 0 ? (
        <SmallBoldText>
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </SmallBoldText>
      ) : null}

      <UserDescription gap={8} align="center">
        <SmallBoldText>{post.user.username}</SmallBoldText>
        <p>{post.description}</p>
      </UserDescription>
    </UserPostContainer>
  );
}
