import { Flex } from "antd";
import styled from "styled-components";

import heartImg from "./../../assets/heart.svg";
import commentImg from "./../../assets/comment.svg";

const LikesContainer = styled(Flex)`
  padding-top: 0.625rem; // 10px

  button {
    background-color: transparent;
  }
`;

export default function LikesGroup() {
  return (
    <LikesContainer vertical gap={11}>
      <Flex gap={14}>
        <button>
          <img src={heartImg} alt="heart icon" />
        </button>

        <button>
          <img src={commentImg} alt="comment icon" />
        </button>
      </Flex>
    </LikesContainer>
  );
}
