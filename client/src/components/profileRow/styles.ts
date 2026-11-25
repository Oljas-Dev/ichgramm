import styled from "styled-components";
import type { ProfileProps } from "../../styles/common";

export const ProfileRowContainer = styled.div<ProfileProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: ${({ $profile }) => $profile && "0.75rem"};
  margin-top: ${({ $profile }) => $profile && "1.625rem"};
  cursor: pointer;

  button {
    font-weight: 600;
  }

  &:hover {
    background-color: ${({ $profile }) => $profile && "var(--gray-border)"};
  }
`;

export const AvatarImage = styled.img`
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
`;

export const UserSinceP = styled.p`
  color: var(--gray-text);
`;
