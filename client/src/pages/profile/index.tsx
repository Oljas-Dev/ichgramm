import { useAppSelector } from "../../hooks/hooks";
import { Flex } from "antd";
import { Link } from "react-router-dom";
import { useState, type MouseEvent } from "react";
import axios from "axios";

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

export default function ProfilePage() {
  const [openPost, setOpenPost] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const data = useAppSelector((state) => state.user.data);
  const pictures = useAppSelector((state) => state.postsLoader.data);

  const state = {
    posts: "123",
    followers: "9993",
    following: "59",
  };

  async function getPostById(id: string) {
    const response = await axios.get(`http://localhost:3333/posts/${id}`);

    setCurrentPost(response.data.post);
    setOpenPost(true);
  }

  function closeModal(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setOpenPost(false);
    }
  }

  return (
    <ProfilePageContainer>
      {openPost && (
        <ModalBackdrop $show={openPost} onClick={(e) => closeModal(e)}>
          <CurrentPost currentPost={currentPost} />
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
        {pictures?.map((picture) => {
          return (
            <Link
              to="#"
              onClick={() => getPostById(picture._id)}
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
