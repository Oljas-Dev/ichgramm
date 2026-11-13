import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    publishedDate: { type: Date, default: Date.now },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
