import { Button, Flex } from "antd";
import styled from "styled-components";
import { TextGray } from "../../../styles/common";
import Avatar from "../../avatar";
import type { User } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserDetails = styled(Flex)`
  padding-top: 63px;
`;

const ChatProfileBtn = styled(Button)`
  background-color: rgba(239, 239, 239, 1);
`;

const StyledText = styled(TextGray)`
  margin-top: 64px;
`;

export default function UserDetailes({ chatWith }: { chatWith: User | null }) {
  const navigate = useNavigate();

  return (
    <UserDetails vertical align="center" gap={17}>
      <Avatar user={chatWith} size="96px" />

      <Flex vertical gap={2}>
        <h2>{chatWith?.fullname}</h2>
        <TextGray>
          {chatWith?.fullname} · {chatWith?.username}
        </TextGray>
      </Flex>

      <ChatProfileBtn onClick={() => navigate(`/profile/${chatWith?._id}`)}>
        View profile
      </ChatProfileBtn>

      <StyledText>Jun 26, 2024, 08:49 PM.</StyledText>
    </UserDetails>
  );
}
