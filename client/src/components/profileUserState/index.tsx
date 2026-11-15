import { Flex } from "antd";
import { BoldP } from "../../styles/common";

interface StateTypes {
  posts: string;
  followers: string;
  following: string;
}

export default function ProfileUserState({ data }: { data: StateTypes }) {
  return (
    <Flex gap={40}>
      <Flex gap={8}>
        <BoldP>{data.posts ? data.posts : "129"}</BoldP>
        <p>posts</p>
      </Flex>

      <Flex gap={8}>
        <BoldP>{data.followers ? data.followers : "9993"}</BoldP>
        <p>followers</p>
      </Flex>

      <Flex gap={8}>
        <BoldP>{data.following ? data.following : "59"}</BoldP>
        <p>following</p>
      </Flex>
    </Flex>
  );
}
