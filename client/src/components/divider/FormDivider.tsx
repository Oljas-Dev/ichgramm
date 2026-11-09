import { Divider } from "antd";
import styled from "styled-components";

const StyledP = styled.p`
  color: var(--gray-text);
`;

export default function FormDivider({ margin = "0" }: { margin: string }) {
  return (
    <Divider style={{ borderColor: "var(--gray-border)", margin: margin }}>
      <StyledP>OR</StyledP>
    </Divider>
  );
}
