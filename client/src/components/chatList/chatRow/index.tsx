import styled from "styled-components";
import type { User } from "../../../redux/slices/authSlice";
import Avatar from "../../avatar";
import { Flex } from "antd";
import { TextGray } from "../../../styles/common";

export interface chatRowTypes {
  user: User | null;
  updatedAt: string;
}

const ChatRowContainer = styled.button`
  background-color: transparent;
  text-align: left;
  width: 100%;

  padding: 8px 24px;
  cursor: pointer;

  &:hover {
    background-color: rgba(239, 239, 239, 1);
  }
`;

export default function ChatRow({ chat }: { chat: chatRowTypes }) {
  return (
    <ChatRowContainer>
      <Flex gap={8} align="center">
        <Avatar user={chat?.user} size="56px" />

        <Flex vertical gap={7}>
          <p>{chat?.user?.username}</p>
          <TextGray>
            {chat?.user?.username} sent a message. · {chat.updatedAt}
          </TextGray>
        </Flex>
      </Flex>
    </ChatRowContainer>
  );
}
