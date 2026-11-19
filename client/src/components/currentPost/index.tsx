import { Button, Flex } from "antd";

import ProfileRow from "../profileRow";
import Avatar from "../avatar";
import { TextGray } from "../../styles/common";
import LikesGroup from "../likesGroup";
import PostComments from "../postComments";

import {
  AddComentForm,
  AddCommentBtn,
  CurrentDescription,
  CurrentPostContainer,
  CurrentPostImg,
  CurrentPostInfo,
  EmojiBtn,
  FlexGrow,
  LikesContainer,
  PostInfoHeader,
  PostInput,
} from "./styles";
import emojiIcon from "./../../assets/emojiBtn.svg";
import type { Post } from "../../redux/slices/postsLoader";

export default function CurrentPost({
  currentPost,
}: {
  currentPost: Partial<Post>;
}) {
  const comments = [
    {
      comment: "😍 спасибо!!!! 👏",
      user: {
        username: "coach.tonia",
        fullname: "coach",
        _id: "1234",
      },
      likes: 1,
      myLike: true,
      createdAt: "17h",
    },
    {
      comment: "Вау, это очень классно на самом деле!",
      user: {
        username: "fsssociety",
        fullname: "f",
        _id: "12345",
      },
      likes: 3,
      createdAt: "23h",
    },
  ];

  if (!currentPost) throw Error("Could not find this post");

  return (
    <CurrentPostContainer>
      <CurrentPostImg
        src={`http://localhost:3333${currentPost.image}`}
        alt="current post image"
      />

      <CurrentPostInfo vertical>
        <FlexGrow>
          <PostInfoHeader justify="space-between">
            <ProfileRow name={currentPost.user?.username} />
            <Button variant="text">...</Button>
          </PostInfoHeader>

          <CurrentDescription>
            <Avatar user={currentPost.user} size="28px" />
            <Flex vertical gap={6}>
              <p>
                <strong>{currentPost.user?.username}</strong> Потрясающие
                новости пришли к нам из Черногории! Проект по поддержке
                бездомных животных TailBook, в разработке которого участвуют
                сразу 9 наших стажёров, будет представлен на Web Summit 2024 в
                Португалии🔥 Мы поздравляем наших студентов, приглашаем вас на
                Web Summit и предлагаем стать частью огромного сообщества крутых
                специалистов, помогающих развивать и очищать нашу планету.
                Занимайте место на бесплатной консультации по ссылке в шапке
                профиля, чтобы узнать подробности!
              </p>
              <TextGray>1 day</TextGray>
            </Flex>
          </CurrentDescription>

          {comments.map((comment, i) => {
            return <PostComments comment={comment} key={i} />;
          })}
        </FlexGrow>

        <LikesContainer>
          <LikesGroup />
        </LikesContainer>

        <div>25 likes</div>
        <TextGray>1 day</TextGray>

        <AddComentForm>
          <PostInput placeholder="Add comment" />
          <EmojiBtn>
            <img src={emojiIcon} alt="Emoji icon" />
          </EmojiBtn>

          <AddCommentBtn type="link" htmlType="submit">
            Share
          </AddCommentBtn>
        </AddComentForm>
      </CurrentPostInfo>
    </CurrentPostContainer>
  );
}
