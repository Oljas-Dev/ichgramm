import { Flex } from "antd";
import type { User } from "../../redux/slices/authSlice";
import styled from "styled-components";
import Avatar from "../avatar";
import UserDetailes from "./userDetailes";

interface ChatMessage {
  id: string;
  user: User | null;
  message: string;
  createdAt: string;
}

export interface userChatTypes {
  currentUser: User | null;
  chatWith: User | null;
  messages: ChatMessage[];
}

const CurrentChatContainer = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const ChatHeader = styled.header`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-border);

  p {
    font-weight: 600;
  }
`;

const ChatContainer = styled(Flex)`
  margin-top: auto;
  width: 100%;
  padding: 1rem;
`;

const StyledMessage = styled(Flex)`
  padding: 29px 18px;
  border-radius: 15px;
`;

const SentChatMessages = styled(StyledMessage)`
  background-color: rgba(77, 0, 255, 1);
  color: rgba(255, 255, 255, 1);
`;

const ReceivedChatMessages = styled(StyledMessage)`
  background-color: rgba(239, 239, 239, 1);
`;

const ReceivedMessageRow = styled(Flex)`
  align-self: flex-start;
  max-width: 75%;
`;

const SentMessageRow = styled(Flex)`
  align-self: flex-end;
  max-width: 75%;
`;

const InputContainer = styled.div`
  padding: 0 21px 92px 17px;
`;
const SendMessageInput = styled.input`
  width: 100%;
  padding: 13px 50px;
  border: 1px solid var(--gray-border);
  border-radius: 22px;
`;

export default function CurrentChat({ userChat }: { userChat: userChatTypes }) {
  const currentUserId = userChat?.currentUser?._id;

  return (
    <CurrentChatContainer vertical>
      <ChatHeader>
        <Avatar user={userChat.chatWith} size="44px" />
        <p>{userChat.chatWith?.fullname}</p>
      </ChatHeader>

      <UserDetailes chatWith={userChat.chatWith} />

      <ChatContainer vertical gap={17}>
        {userChat.messages.map((message) => {
          const isOwnMessage = message.user?._id === currentUserId;

          if (isOwnMessage) {
            return (
              <SentMessageRow gap={8} key={message.id}>
                <div>
                  <Avatar user={message.user} size="28px" />
                </div>
                <SentChatMessages>
                  <p>{message.message}</p>
                </SentChatMessages>
              </SentMessageRow>
            );
          } else {
            return (
              <ReceivedMessageRow gap={8} key={message.id}>
                <div>
                  <Avatar user={message.user} size="28px" />
                </div>
                <ReceivedChatMessages gap={8}>
                  <p>{message.message}</p>
                </ReceivedChatMessages>
              </ReceivedMessageRow>
            );
          }
        })}
      </ChatContainer>

      <InputContainer>
        <SendMessageInput placeholder="Write message" />
      </InputContainer>
    </CurrentChatContainer>
  );
}
