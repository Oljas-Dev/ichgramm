import { Flex } from "antd";

import checkImg from "./../../assets/check_image.png";
import styled from "styled-components";

const StyledScrollEnd = styled(Flex)`
  grid-column: 2;
  text-align: center;

  padding: 2.375rem 0 4.625rem; // 38px 0 74px;

  img {
    width: 5.125rem; // 82px;
  }
  p {
    font-size: var(--small-text-xs);
    color: var(--gray-text);
  }
`;

export default function ScrollEnd() {
  return (
    <StyledScrollEnd vertical justify="center" align="center" gap={11}>
      <img src={checkImg} alt="check image" />
      <Flex vertical gap={3}>
        <h3>You've seen all the updates</h3>
        <p>You have viewed all new publications</p>
      </Flex>
    </StyledScrollEnd>
  );
}
