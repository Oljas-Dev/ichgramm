import { Flex } from "antd";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";

const Container = styled(Flex)`
  width: 100%;
  height: 60%;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-sm);
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  min-width: 400px;
  border-radius: 12px;

  li {
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid var(--gray-border);
    cursor: pointer;

    &:hover {
      font-weight: 700;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

export default function CurrentPostMenu() {
  const dispatch = useAppDispatch();

  return (
    <Container justify="center" align="center">
      <StyledUl>
        <li style={{ color: "rgba(237, 73, 86, 1)" }}>Delete</li>
        <li>Edit</li>
        <li>Go to post</li>
        <li>Copy link</li>
        <li onClick={() => dispatch(closeModal())}>Cancel</li>
      </StyledUl>
    </Container>
  );
}
