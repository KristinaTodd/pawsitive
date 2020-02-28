import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId

const Post = new Schema(
  {
    profileId: { type: objectId, ref: "Profile", required: true },
    name: { type: String, required: true },
    totalPoints: { type: Number, required: true, default: 0 },
    imgUrl: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Post.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Post;
