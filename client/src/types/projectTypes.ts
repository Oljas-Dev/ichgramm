import type { User } from "../redux/slices/authSlice";

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
  likes: number;
  comments: commentsTypes[];
  createdAt: string;
  updatedAt: string;
  user: User | null;
  _id?: string;
}

export type ModalTypes =
  | "postMenu"
  | "currentPost"
  | "Create"
  | "Search"
  | "Notifications"
  | "";
