import { Button, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFollow } from "../../hooks/useFollow";
import { fetchProfilePage } from "../../redux/functions/postFunctions";

const UsernameRow = styled(Flex)`
  font-size: 19.84px;
`;

const GrayButton = styled(Button)`
  background-color: rgba(239, 239, 239, 1);
`;
export default function ProfileUsernameRow({
  username,
}: {
  username: string | undefined;
}) {
  const { userId } = useParams();
  const { follow, unfollow } = useFollow();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUserId = useAppSelector((state) => state.user.data?._id);
  const followers = useAppSelector(
    (state) => state.postsLoader.accumulatedData?.followers,
  );

  const isProfileOwner = userId === currentUserId;
  const isFollowing = followers?.some(
    (followerId) => followerId.following === userId,
  );

  function handleUnfollow() {
    if (!userId || !username) throw Error("No user found");
    unfollow(userId, username, () => dispatch(fetchProfilePage(userId)));
  }
  function handleFollow() {
    if (!userId || !username) throw Error("No user found");
    follow(userId, username, () => dispatch(fetchProfilePage(userId)));
  }

  return (
    <UsernameRow gap={23} align="center">
      <p>{username}</p>
      {isProfileOwner ? (
        <GrayButton variant="filled" onClick={() => navigate("/profile/edit")}>
          Edit profile
        </GrayButton>
      ) : (
        <Flex gap={8}>
          {isFollowing ? (
            <Button type="primary" onClick={handleUnfollow}>
              Unfollow
            </Button>
          ) : (
            <Button type="primary" onClick={handleFollow}>
              Follow
            </Button>
          )}
          <GrayButton variant="filled">Message</GrayButton>
        </Flex>
      )}
    </UsernameRow>
  );
}
