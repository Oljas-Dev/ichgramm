import { Flex } from "antd";
import styled from "styled-components";

export const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 15.25rem 1fr;
  max-width: 1440px;
  width: 100%;
  min-height: 85vh;
  margin: 0 auto;

  position: relative;
`;

export const AuthLayout = styled.main`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 5.0625rem; // 81px

  position: relative;
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

export interface ProfileProps {
  $profile?: boolean;
  $width?: string;
  $height?: string;
}

export const PicturePlaceholder = styled.div<ProfileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => ($width ? $width : "1.75rem")};
  height: ${({ $height }) => ($height ? $height : "1.75rem")};
  background: gray;
  font-size: var(--font-size-xs);
  color: var(--gray-border);
  border-radius: 50%;

  border: ${({ $profile }) => $profile && "1px solid rgba(0, 0, 0, 0.098)"};
`;

export const InputsContainer = styled(Flex)`
  text-align: left;
`;

export const ErrorP = styled.p`
  font-size: var(--font-size-xs);
  color: rgba(255, 0, 20, 1);
`;
export const BoldP = styled.p`
  font-weight: 600;
`;

export const borderColor = "rgba(219, 219, 219, 1)";
export const formTextColor = "rgba(115, 115, 115, 1)";
export const TextCenter = styled.div`
  text-align: center;
`;
