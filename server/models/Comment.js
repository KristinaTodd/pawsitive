import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId

const Comment = new Schema(
  {
    profileId: { type: objectId, ref: "Profile", required: true },
    postId: { type: objectId, ref: "Post", required: true },
    totalPoints: { type: Number, required: true, default: 0 },
    creatorEmail: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Comment;
