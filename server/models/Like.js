import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ postId: 1, likedBy: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;
