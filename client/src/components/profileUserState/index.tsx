import { Flex } from "antd";
import { BoldP } from "../../styles/common";

interface StateTypes {
  posts: number | undefined;
  followers: number | undefined;
  following: number | undefined;
}

export default function ProfileUserState({ data }: { data: StateTypes }) {
  return (
    <Flex gap={40}>
      <Flex gap={8}>
        <BoldP>{data.posts}</BoldP>
        <p>posts</p>
      </Flex>

      <Flex gap={8}>
        <BoldP>{data.followers}</BoldP>
        <p>followers</p>
      </Flex>

      <Flex gap={8}>
        <BoldP>{data.following}</BoldP>
        <p>following</p>
      </Flex>
    </Flex>
  );
}
