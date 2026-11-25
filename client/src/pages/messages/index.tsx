import styled from "styled-components";
import { useAppSelector } from "../../hooks/hooks";

const MessagesContainer = styled.section`
  display: grid;
  grid-template-columns: 35% 65%;
`;

export default function Messages() {
  const user = useAppSelector((state) => state.user.data);

  return (
    <MessagesContainer>
      <h2>{user?.username}</h2>
      <div>current chat</div>
    </MessagesContainer>
  );
}
