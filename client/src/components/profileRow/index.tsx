import { Flex } from "antd";
import { getMemberDuration } from "../../helpers/getMemberDuration";
import { PicturePlaceholder } from "../../styles/common";
import PostFollowButton from "../postFollowButton";
import type { Post } from "../../redux/slices/postsSlice";
import { fetchUrl } from "../../variables/commonVariables";
import { AvatarImage, ProfileRowContainer, UserSinceP } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";
import type { currentPostType } from "../../types/projectTypes";

export default function ProfileRow({
  post,
  followOption,
  createdAt,
  userId,
}: {
  post: Post | currentPostType;
  followOption?: boolean;
  menuRow?: boolean;
  createdAt?: string;
  userId?: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const memberSince = getMemberDuration(createdAt);
  const avatar = post?.user?.avatar;
  const username = post?.user?.username;
  const isFollowing = post?.isFollowing;
  const isOwner = post?.isOwner;

  if (!username || !userId) return <p>Did not find user</p>;

  function handleProfileClick() {
    navigate(`/profile/${post?.user?._id}`);
    dispatch(closeModal());
  }

  return (
    <ProfileRowContainer onClick={handleProfileClick}>
      {avatar ? (
        <AvatarImage
          src={`${fetchUrl}${avatar}`}
          alt={`${username}'s name`}
          width={28}
        />
      ) : (
        <PicturePlaceholder>{username[0].toUpperCase()}</PicturePlaceholder>
      )}
      <Flex gap={8}>
        <p>{username}</p>
        {createdAt && <UserSinceP>• {memberSince} •</UserSinceP>}
      </Flex>

      {followOption && !isOwner && (
        <PostFollowButton
          userId={userId}
          username={username}
          isFollowing={isFollowing}
        />
      )}
    </ProfileRowContainer>
  );
}
