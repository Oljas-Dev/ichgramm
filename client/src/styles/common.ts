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

  flex-shrink: 0;
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
export const TextGray = styled.p`
  color: var(--gray-text);
`;
interface RelativeProps {
  $styles?: string;
}
export const RelativePositionContainer = styled.div<RelativeProps>`
  ${({ $styles }) => $styles}
  position: relative;
`;
export const TextCenter = styled.div`
  text-align: center;
`;

interface BackdropProps {
  $show: boolean;
  $column?: string;
}

// Modal
export const ModalBackdrop = styled.div<BackdropProps>`
  display: ${({ $show }) => ($show ? "block" : "none")};
  grid-column: ${({ $column }) => $column};
  font-size: var(--font-size-xs);

  background-color: rgba(0, 0, 0, 0.65);
  padding: 2.9375rem 5.9375rem 0 6.25rem; // 47px 95px 0 100px;
  position: absolute;
  inset: 0;

  z-index: 10;
`;
