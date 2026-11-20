import { Button, Flex } from "antd";
import styled from "styled-components";

export const CurrentPostContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: center;

  height: 60%;
  z-index: 20;
`;

export const CurrentImageContainer = styled(Flex)`
  height: 100%;
  background-color: #000;
`;

export const CurrentPostImg = styled.img`
  width: 100%;
  // aspect-ratio: 1/1;
  object-fit: top;
  object-position: center;
`;

export const CurrentPostInfo = styled(Flex)`
  background-color: #fff;
  padding: 0.5625rem 0.5625rem 0;
  width: 100%;
`;

export const PostInfoHeader = styled(Flex)`
  margin: 0 -0.5625rem;
  padding: 0 0.5625rem 0.5rem; //8px;
  border-bottom: 1px solid var(--gray-border);
`;

export const CurrentDescription = styled.div`
  display: grid;
  grid-template-columns: 1.75rem 1fr;
  gap: 0.6875rem; // 11px;
  padding-top: 0.5rem; //8px;
`;

export const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const LikesContainer = styled.div`
  margin: 0 -0.5625rem;
  padding: 2px 0 14px 0.5625rem;
  border-top: 1px solid var(--gray-border);
`;

export const AddComentForm = styled.form`
  margin: 11px -0.5625rem 0;
  position: relative;
`;

export const AddCommentBtn = styled(Button)`
  position: absolute;
  top: 0.2rem;
  right: 0.4rem;
`;

export const PostInput = styled.input`
  font-size: inherit;
  width: 100%;
  padding: 13px 48px;
  border: none;
  border-top: 1px solid var(--gray-border);
`;

export const EmojiBtn = styled.button`
  background: transparent;
  position: absolute;
  top: 0.2rem;
  left: 0.4rem;
`;
