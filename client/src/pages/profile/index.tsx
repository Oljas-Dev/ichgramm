import styled from "styled-components";
import { useAppSelector } from "../../hooks/hooks";
import { Flex } from "antd";
import { Link } from "react-router-dom";

import Avatar from "../../components/avatar";
import ProfileUserState from "../../components/profileUserState";
import ProfileUsernameRow from "../../components/profileUsernameRow";

import linkImg from "./../../assets/profile_link.svg";

const ProfileContainer = styled.section`
  display: flex;
  align-items: start;
  gap: 5.3125rem; // 85px;
  padding: 38px 95px 0 170px;

  button {
    font-size: var(--font-size-small);
    font-weight: 600;
    background-color: rgba(239, 239, 239, 1);
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  a {
    color: rgba(0, 55, 107, 1);
    &:hover {
      color: lightblue;
    }
  }
`;

const Description = styled.p`
  max-width: 435px;
  white-space: pre-wrap;
`;

export default function ProfilePage() {
  const data = useAppSelector((state) => state.user.data);

  const state = {
    posts: "123",
    followers: "9993",
    following: "59",
  };

  return (
    <ProfileContainer>
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
    </ProfileContainer>
  );
}
