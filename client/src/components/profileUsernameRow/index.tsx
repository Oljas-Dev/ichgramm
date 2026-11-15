import { Button, Flex } from "antd";
import styled from "styled-components";

const UsernameRow = styled(Flex)`
  font-size: 19.84px;
`;
export default function ProfileUsernameRow({
  username,
}: {
  username: string | undefined;
}) {
  return (
    <UsernameRow gap={23} align="center">
      <p>{username}</p>
      <Button variant="filled">Edit profile</Button>
    </UsernameRow>
  );
}
