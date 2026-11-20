import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Flex } from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, type MouseEvent } from "react";

import Avatar from "../../components/avatar";
import ProfileUserState from "../../components/profileUserState";
import ProfileUsernameRow from "../../components/profileUsernameRow";

import linkImg from "./../../assets/profile_link.svg";

import {
  Description,
  HeaderContainer,
  ImageContainer,
  PicturesContainer,
  ProfilePageContainer,
} from "./styles";
import CurrentPost from "../../components/currentPost";
import { ModalBackdrop } from "../../styles/common";
import type { currentPostType } from "../../types/projectTypes";
import {
  fetchPostById,
  fetchProfilePage,
} from "../../redux/slices/postsLoader";

export default function ProfilePage() {
  const [openPost, setOpenPost] = useState(false);
  const { userId } = useParams();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.data);
  const pictures = useAppSelector((state) => state.postsLoader.currentPost);

  const state = {
    posts: "123",
    followers: "9993",
    following: "59",
  };

  function handlePost(id: string | undefined) {
    dispatch(fetchPostById(id));
    setOpenPost(true);
  }

  function closeModal(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setOpenPost(false);
    }
  }

  useEffect(() => {
    if (!userId) return;

    async function fetchPosts() {
      dispatch(fetchProfilePage(userId));
    }

    fetchPosts();
  }, [userId, dispatch]);

  return (
    <ProfilePageContainer>
      {openPost && (
        <ModalBackdrop $show={openPost} onClick={(e) => closeModal(e)}>
          <CurrentPost />
        </ModalBackdrop>
      )}

      <HeaderContainer>
        <Avatar user={data} />
        <Flex vertical gap={19.5}>
          <ProfileUsernameRow username={data?.username} />
          <ProfileUserState data={state} />
          <Description>
            • Гарантия помощи с трудоустройством в ведущие IT-компании •
            Выпускники зарабатывают от 45к евро БЕСПЛАТНАЯ
          </Description>

          <Flex gap={8}>
            <img src={linkImg} alt="link image" />
            <Link to="#">bit.ly/3rpiIbh</Link>
          </Flex>
        </Flex>
      </HeaderContainer>

      <PicturesContainer>
        {pictures?.map((picture: currentPostType) => {
          return (
            <Link
              to="#"
              onClick={() => handlePost(picture._id)}
              key={picture._id}
            >
              <ImageContainer
                src={`http://localhost:3333${picture.image}`}
                alt={picture._id}
              />
            </Link>
          );
        })}
      </PicturesContainer>
    </ProfilePageContainer>
  );
}
