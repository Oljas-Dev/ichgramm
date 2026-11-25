import toast from "react-hot-toast";
// import { fetchProfilePage } from "../redux/functions/postFunctions";
import { useAppDispatch } from "./hooks";
import { followUser, unfollowUser } from "../redux/functions/followFunctions";

export function useFollow() {
  const dispatch = useAppDispatch();

  async function follow(
    userId: string,
    username: string,
    callback?: () => void | Promise<unknown>,
  ) {
    await dispatch(followUser(userId)).unwrap();

    toast.success(`You follow ${username} now`);

    await callback?.();
  }

  async function unfollow(
    userId: string,
    username: string,
    callback?: () => void | Promise<unknown>,
  ) {
    await dispatch(unfollowUser(userId)).unwrap();

    toast.success(`You have unfollowed ${username}`);

    await callback?.();
  }

  return { follow, unfollow };
}
