import { Button, Flex } from "antd";

import ProfileRow from "../profileRow";
import Avatar from "../avatar";
import { TextGray } from "../../styles/common";
import LikesGroup from "../likesGroup";
import PostComments from "../postComments";

import {
  CurrentDescription,
  CurrentImageContainer,
  CurrentPostContainer,
  CurrentPostImg,
  CurrentPostInfo,
  FlexGrow,
  LikesContainer,
  PostInfoHeader,
} from "./styles";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setModal } from "../../redux/slices/modalSlice";
import AddPostComment from "../addPostComment";

export default function CurrentPost() {
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector((state) => state.postsLoader.postById);

  // console.log(testPost);

  if (!currentPost) throw Error("Could not find this post");

  return (
    <CurrentPostContainer>
      <CurrentImageContainer justify="center" align="center">
        <CurrentPostImg
          src={`http://localhost:3333${currentPost.image}`}
          alt="current post image"
        />
      </CurrentImageContainer>

      <CurrentPostInfo vertical>
        <FlexGrow>
          <PostInfoHeader justify="space-between">
            <ProfileRow name={currentPost.user?.username} />
            <Button
              variant="text"
              onClick={() => dispatch(setModal("postMenu"))}
            >
              ...
            </Button>
          </PostInfoHeader>

          <CurrentDescription>
            <Avatar user={currentPost.user} size="28px" />
            <Flex vertical gap={6}>
              <p>
                <strong>{currentPost.user?.username} </strong>{" "}
                {currentPost.description}
              </p>
              <TextGray>1 day</TextGray>
            </Flex>
          </CurrentDescription>

          {currentPost.comments.map((comment, i) => {
            return <PostComments comment={comment} key={i} />;
          })}
        </FlexGrow>

        <LikesContainer>
          <LikesGroup />
        </LikesContainer>

        <div>25 likes</div>
        <TextGray>1 day</TextGray>

        <AddPostComment postId={currentPost._id} />
      </CurrentPostInfo>
    </CurrentPostContainer>
  );
}
