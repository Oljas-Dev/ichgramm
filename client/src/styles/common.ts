import { Flex } from "antd";
import styled from "styled-components";

export const MainContainer = styled.main`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 5.0625rem; // 81px
`;

export const AuthContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem; // 15px
  max-width: 1440px;

  a {
    font-size: var(--font-size-xs);
    color: rgba(0, 55, 107, 1);

    &:hover {
      color: purple;
    }
  }
`;

export const InputsContainer = styled(Flex)`
  text-align: left;
`;

export const ErrorP = styled.p`
  font-size: var(--font-size-xs);
  color: rgba(255, 0, 20, 1);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  width: 100%;
`;

export const borderColor = "rgba(219, 219, 219, 1)";
export const formTextColor = "rgba(115, 115, 115, 1)";
