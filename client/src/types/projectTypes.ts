import type { User } from "../redux/slices/authSlice";
import type { LikeTypes } from "../redux/slices/likeSlice";

export interface commentsTypes {
  comment: string;
  likes: number;
  myLike: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  commentBy: User;
}

export interface currentPostType {
  description: string;
  image: string;
  likes: LikeTypes[];
  comments: commentsTypes[];
  createdAt: string;
  updatedAt: string;
  user: User | null;
  isFollowing: boolean;
  isOwner?: boolean;
  _id?: string | undefined;
}

export type ModalTypes =
  | "postMenu"
  | "currentPost"
  | "create"
  | "search"
  | "notifications"
  | "";
