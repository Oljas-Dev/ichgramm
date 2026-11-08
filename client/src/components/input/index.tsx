import type { ComponentProps } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: rgba(250, 250, 250, 1);
  border: 1px solid var(--gray-border);
  border-radius: 3px;
  padding: 0.6875rem 0.5rem; //11px 8px

  width: 100%;
`;

type InputProps = ComponentProps<"input">;

export default function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
