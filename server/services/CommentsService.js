import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class CommentsService {


  async getAll() {
    let comments = await dbContext.Comment.find({})
    return comments;
  }
  async getById(id) {
    let comment = await dbContext.Comment.findById(id);
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    return comment;
  }

  async  getCommentsByPostId(postId) {
    return await dbContext.Comment.find({ postId })
  }

  async  getCommentsByProfileId(profileId) {
    return await dbContext.Comment.find({ profileId })
  }

  async create(body) {
    return await dbContext.Comment.create(body)
  }
  async edit(id, update, email) {
    let comment = await dbContext.Comment.findById(id)
    // @ts-ignore
    if (comment.creator != email) {
      throw new UnAuthorized()
    }

    // @ts-ignore
    comment.body = update.body
    await comment.save()
    return comment
  }

  async delete(id, email) {
    let comment = await dbContext.Comment.findById(id)
    // @ts-ignore
    if (comment.creator != email) {
      throw new UnAuthorized()
    }
    await dbContext.Comment.findByIdAndDelete(comment.id)
  }
}

export const commentsService = new CommentsService();
