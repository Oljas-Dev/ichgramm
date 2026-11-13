import { Flex } from "antd";
import styled from "styled-components";

export const CreatePostContainer = styled.article`
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  button {
    grid-column: 3;
    justify-self: end;
    font-size: var(--font-size-small);
    font-weight: 600;
    padding: 0;
    background-color: transparent;
  }
`;

export const Form = styled.form`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1rem;
  overflow: hidden;

  width: 80%;
`;

export const FormHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gray-border);

  h3 {
    grid-column: 2;
    text-align: center;
  }
`;

export const InputArea = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const AddFileContainer = styled.div`
  background-color: rgba(250, 250, 250, 1);
  padding: 184px 210px;
  border-right: 1px solid var(--gray-border);
`;

export const TextareaWrapper = styled.div`
  position: relative;
`;

export const EmojiWrapper = styled.div`
  position: absolute;
  top: 21rem;
  right: 5rem;
  z-index: 1000;
`;

export const TextareaGroup = styled(Flex)`
  padding: 1.125rem 1rem;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  resize: vertical;
`;

export const CharacterCounter = styled.span`
  position: absolute;
  right: 12px;
  bottom: 10px;
  font-size: 0.75rem;
  color: #888;
`;
