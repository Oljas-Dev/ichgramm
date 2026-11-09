import styled from "styled-components";
import { borderColor } from "../../../styles/common";
import { Link } from "react-router-dom";

interface ButtonProps {
  $paddings?: string;
  $color?: string;
}

interface AuthFormProps {
  $gap?: string;
}

export const AuthForm = styled.form<AuthFormProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = "2.375rem" }) => $gap}; // 38px
  width: 100%;

  p {
    font-size: var(--font-size-xs);
  }

  button {
    font-weight: 600;
  }
`;

export const Card = styled.div<ButtonProps>`
  text-align: center;
  color: ${({ $color = "var(--gray-text)" }) => $color};
  max-width: 21.875rem; // 350px
  padding: ${({ $paddings = "1.875rem 2.625rem" }) => $paddings}; // 19px 42px
  border: 1px solid ${borderColor};

  position: relative;
`;

export const StyledLink = styled(Link)`
  color: rgba(0, 149, 246, 1) !important;
  font-size: var(--font-size-small) !important;
  font-weight: 600;
`;

export const SmallText = styled.p`
  font-size: var(--font-size-small) !important;
`;
