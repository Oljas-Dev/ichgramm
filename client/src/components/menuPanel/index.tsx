import { Flex } from "antd";
import type { ReactNode } from "react";
import styled from "styled-components";

const PanelContainer = styled(Flex)`
  background-color: #fff;
  min-width: 19rem;
  height: 80%;
  padding: 1rem 1.5rem; //16px 24px

  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: -2px 0 24px rgba(0, 0, 0, 0.15);

  position: absolute;
  left: 0;
  top: 0;
  h2 {
    font-size: 1.5rem; // 24px
    font-weight: 600;
  }
`;

export default function MenuPanel({
  titel,
  children,
}: {
  titel: string;
  children: ReactNode;
}) {
  return (
    <PanelContainer vertical gap={39}>
      <h2>{titel}</h2>
      {children}
    </PanelContainer>
  );
}
