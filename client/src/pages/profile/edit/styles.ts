import { Button, Flex } from "antd";
import styled from "styled-components";

export const EditProfileContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.75rem; // 44px;
  padding: 48px 167px;
`;

export const NewAvatar = styled(Flex)`
  background-color: rgba(239, 239, 239, 1);
  padding: 1rem;
  border-radius: 1.25rem;

  button {
    font-size: var(--font-size-small);
    font-weight: 600;
  }
`;

export const StyledButton = styled(Button)`
  padding: 0.5rem 5.875rem;
  width: fit-content;
`;

export const InputsContainer = styled(Flex)`
  label {
    ffont-size: 1rem;
    font-weight: 600;
  }
`;

export const InputWithIcon = styled(Flex)`
  position: relative;
`;

interface EditProps {
  $icon?: boolean;
}
export const EditInput = styled.input<EditProps>`
  font-size: var(--font-size-small);
  padding: 0.75rem ${({ $icon }) => ($icon ? "2.25rem" : "1rem")};
  border: 1px solid var(--gray-border);
  border-radius: 0.75rem;
`;

export const InputIcon = styled.img`
  position: absolute;
  top: 2.7rem;
  left: 1rem;
`;

export const StyledTextarea = styled.textarea`
  font-size: var(--font-size-small);
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-border);
  border-radius: 0.75rem;
`;