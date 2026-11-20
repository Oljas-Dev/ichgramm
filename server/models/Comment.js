import mongoose, { mongo } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    myLike: {
      type: Boolean,
      default: false,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
