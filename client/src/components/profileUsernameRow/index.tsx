import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UsernameRow = styled(Flex)`
  font-size: 19.84px;
`;
export default function ProfileUsernameRow({
  username,
}: {
  username: string | undefined;
}) {
  const navigate = useNavigate();
  return (
    <UsernameRow gap={23} align="center">
      <p>{username}</p>
      <Button variant="filled" onClick={() => navigate("/profile/edit")}>
        Edit profile
      </Button>
    </UsernameRow>
  );
}
