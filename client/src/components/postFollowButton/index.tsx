import { Button } from "antd";
import { useFollow } from "../../hooks/useFollow";
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect, type MouseEvent } from "react";
import { currentFollowers } from "../../redux/functions/followFunctions";
import { fetchAllPosts } from "../../redux/functions/postFunctions";

export default function PostFollowButton({
  userId,
  username,
  isFollowing,
}: {
  userId: string;
  username: string;
  isFollowing: boolean;
}) {
  const { follow, unfollow } = useFollow();
  const dispatch = useAppDispatch();

  function handleFollow(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    follow(userId, username, () => dispatch(fetchAllPosts("posts")));
  }

  function handleUnfollow(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    unfollow(userId, username, () => dispatch(fetchAllPosts("posts")));
  }

  useEffect(() => {
    dispatch(currentFollowers(userId));
  }, [dispatch, userId]);

  return (
    <>
      {isFollowing ? (
        <Button type="link" onClick={handleUnfollow}>
          Unfollow
        </Button>
      ) : (
        <Button type="link" onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
}
