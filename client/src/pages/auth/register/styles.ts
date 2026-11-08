import styled from "styled-components";
import { borderColor } from "../../../styles/common";
import { Link } from "react-router-dom";

interface ButtonProps {
  $paddings?: string;
}

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.375rem; // 38px

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  p,
  a {
    font-size: var(--font-size-xs);
  }

  a {
    color: rgba(0, 55, 107, 1);

    &:hover {
      color: purple;
    }
  }

  button {
    // font-size: var();
    font-weight: 600;
  }
`;

export const Card = styled.div<ButtonProps>`
  text-align: center;
  color: var(--gray-text);
  max-width: 21.875rem; // 350px
  padding: ${({ $paddings = "1.875rem 2.625rem " }) => $paddings}; // 19px 42px
  border: 1px solid ${borderColor};
`;

export const StyledLink = styled(Link)`
  color: rgba(0, 149, 246, 1);
  font-size: var(--font-size-small);
  font-weight: 600;
`;
