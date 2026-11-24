import { useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchAllPosts } from "../../../redux/functions/postFunctions";

import UserPost from "../../../components/userPost";
import ScrollEnd from "../../../components/scrollEnd";

const PostGroup = styled.div`
  overflow: auto;
`;

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
    <PostGroup>
      <PostsContainer>
        {data.map((post, i) => {
          return (
            <UserPost post={post} i={i} key={post._id} myPost={post.isOwner} />
          );
        })}
      </PostsContainer>
      <ScrollEnd />
    </PostGroup>
  );
}
