import { Button, Flex } from "antd";

import ProfileRow from "../profileRow";
import Avatar from "../avatar";
import { ModalBackdrop, TextGray } from "../../styles/common";
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
import AddPostComment from "../addPostComment";
import CurrentPostMenu from "../currentPostMenu";
import { useState, type MouseEvent } from "react";
import { getMemberDuration } from "../../helpers/getMemberDuration";
import { fetchPostById } from "../../redux/functions/postFunctions";

export default function CurrentPost({ follow = true }: { follow?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curretnPostId, setCurrentPostId] = useState<string | undefined>("");
  const currentPost = useAppSelector((state) => state.postsLoader.postById);

  const dispatch = useAppDispatch();
  const likes = currentPost?.likes.length;

  if (!currentPost) throw Error("Could not find this post");

  const showModal = (id: string | undefined) => {
    setIsModalOpen(true);
    setCurrentPostId(id);
  };

  const close = (e: MouseEvent<HTMLLIElement | HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ModalBackdrop $show={isModalOpen} $column="2" onClick={close}>
        <CurrentPostMenu
          close={close}
          onFinish={setIsModalOpen}
          postId={curretnPostId}
        />
      </ModalBackdrop>
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
              <ProfileRow
                post={currentPost}
                userId={currentPost.user?._id}
                followOption={follow}
              />
              <Button
                variant="text"
                onClick={() => showModal(currentPost?._id)}
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
            <LikesGroup
              id={currentPost?._id}
              likes={currentPost?.likes}
              render={() => dispatch(fetchPostById(currentPost?._id))}
            />
          </LikesContainer>

          <div>
            {likes} {likes > 1 ? "likes" : "like"}
          </div>
          <TextGray>{getMemberDuration(currentPost?.createdAt)}</TextGray>

          <AddPostComment postId={currentPost._id} />
        </CurrentPostInfo>
      </CurrentPostContainer>
    </>
  );
}
