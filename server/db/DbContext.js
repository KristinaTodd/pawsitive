import mongoose from "mongoose";
import ProfileSchema from "../models/Profile";
import PostSchema from "../models/Post"
import CommentSchema from "../models/Comment"

class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Post = mongoose.model("Post", PostSchema);
  Comment = mongoose.model("Comment", CommentSchema);
}

export const dbContext = new DbContext();
