import styled from "styled-components";
import { useAppSelector } from "../../hooks/hooks";
import ChatList from "../../components/chatList";
import CurrentChat, { type userChatTypes } from "../../components/chatCurrent";

const MessagesContainer = styled.section`
  display: grid;
  grid-template-columns: 35% 65%;
`;

export default function Messages() {
  const user = useAppSelector((state) => state.user.data);

  const currentChatState: userChatTypes = {
    chatWith: user,
    currentUser: user,
    messages: [
      {
        user,
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "today",
        id: "12334",
      },
      {
        user: {
          _id: "6af4a3822bc8c5d09357a77b",
          username: "Djazz",
          fullname: "Oljas Medetbaev",
          createdAt: "2026-11-11T17:18:58.607Z",
          about:
            "Fullstack web-developer with hands on experience in Node.js, React.js, Typescript, MongoDB",
          website: "medets.dev",
          avatar: "/avatars/e568b824-8304-42d9-a2aa-de0d7bd91a26.png",
        },
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: "today",
        id: "12345",
      },
    ],
  };

  return (
    <MessagesContainer>
      <ChatList user={user} />
      <CurrentChat userChat={currentChatState} />
    </MessagesContainer>
  );
}
