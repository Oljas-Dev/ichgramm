import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUrl } from "../../variables/commonVariables";
import { useEffect } from "react";
import {
  fetchAllPosts,
  fetchPostById,
} from "../../redux/functions/postFunctions";
import { setModal } from "../../redux/slices/modalSlice";

const ExploreContainer = styled.section`
  padding: 5.625rem 7.6875rem; // 90px 123px
`;

const ImageGrid = styled.div`
  columns: 4;
  column-gap: 4px;

  img {
    width: 100%;
    display: block;
    margin-bottom: 4px;
    break-inside: avoid;
  }

  @media (max-width: 1000px) {
    columns: 3;
  }

  @media (max-width: 650px) {
    columns: 2;
  }
`;

export default function Explore() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postsLoader.data);

  useEffect(() => {
    dispatch(fetchAllPosts("posts"));
  }, [dispatch]);

  function openPost(id: string | undefined) {
    dispatch(fetchPostById(id));
    dispatch(setModal("currentPost"));
  }

  return (
    <ExploreContainer>
      <ImageGrid>
        {posts.map((post) => (
          <img
            key={post._id}
            src={`${fetchUrl}${post.image}`}
            alt={post.description || "Post"}
            onClick={() => openPost(post._id)}
          />
        ))}
      </ImageGrid>
    </ExploreContainer>
  );
}
