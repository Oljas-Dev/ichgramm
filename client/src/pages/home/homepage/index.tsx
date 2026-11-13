import { useEffect } from "react";
import styled from "styled-components";

import { fetchAllPosts } from "../../../redux/slices/postsLoader";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import UserPost from "../../../components/userPost";

const PostsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  padding: 3.4375rem 4.875rem; // 55px 78px

  button {
    background-color: transparent;
  }
`;

export default function Homepage() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.postsLoader.data);

  useEffect(() => {
    dispatch(fetchAllPosts("posts"));
  }, [dispatch]);

  return (
    <PostsContainer>
      {data.map((post, i) => {
        return (
          <UserPost post={post} i={i} key={post._id} myPost={post.isOwner} />
        );
      })}
    </PostsContainer>
  );
}
