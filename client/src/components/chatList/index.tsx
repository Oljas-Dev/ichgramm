import styled from "styled-components";
import type { User } from "../../redux/slices/authSlice";
import ChatRow, { type chatRowTypes } from "./chatRow";

const ChatListContainer = styled.div`
  border-right: 1px solid var(--gray-border);
`;

const StyledH2 = styled.h2`
  padding: 37px 0 14px 24px;
`;

export default function ChatList({ user }: { user: User | null }) {
  const chatRowState: chatRowTypes = {
    user,
    updatedAt: "2 wek",
  };

  return (
    <ChatListContainer>
      <StyledH2>{user?.username}</StyledH2>
      <ChatRow chat={chatRowState} />
    </ChatListContainer>
  );
}
