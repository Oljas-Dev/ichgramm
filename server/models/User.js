import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
