import { useForm, type SubmitHandler } from "react-hook-form";
import {
  AddComentForm,
  AddCommentBtn,
  EmojiBtn,
  PostInput,
} from "../currentPost/styles";
import emojiIcon from "./../../assets/emojiBtn.svg";
import axios from "axios";
import { fetchUrl } from "../../variables/commonVariables";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";
import type { ApiError } from "../../pages/auth/register";
import { fetchPostById } from "../../redux/slices/postsLoader";

interface postCommentTypes {
  postComment: string;
}

export default function AddPostComment({
  postId,
}: {
  postId: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<postCommentTypes>();

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.data?._id);

  const submit: SubmitHandler<postCommentTypes> = async (data) => {
    const comment = data.postComment;

    try {
      await axios.post(`${fetchUrl}/comment/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        comment,
        postId,
      });

      dispatch(fetchPostById(postId));
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error("Failed to add comment");
        console.error("Failed to add comment: ", err.response?.data.message);
      } else {
        throw err;
      }
    }

    reset();
  };

  return (
    <AddComentForm onSubmit={handleSubmit(submit)}>
      <PostInput
        placeholder="Add comment"
        {...register("postComment", {
          required: "Please add your comment",
        })}
      />
      <EmojiBtn>
        <img src={emojiIcon} alt="Emoji icon" />
      </EmojiBtn>

      <AddCommentBtn type="link" htmlType="submit">
        Share
      </AddCommentBtn>

      {errors.postComment?.message && <p>{errors.postComment?.message}</p>}
    </AddComentForm>
  );
}
