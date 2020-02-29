import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class PostsService {


  async getAll(query = {}) {
    let posts = await dbContext.Post.find(query).populate(
      "creator",
      "name picture"
    );
    return posts;
  }
  async getById(id) {
    let post = await dbContext.Post.findById(id);
    if (!post) {
      throw new BadRequest("Invalid Id");
    }
    return post;
  }

  async getPostsByProfileId(profileId) {
    return await dbContext.Post.find({ profileId })
  }


  async create(body) {
    return await dbContext.Post.create(body)
  }
  async edit(id, update, email) {
    let post = await dbContext.Post.findById(id)
    // @ts-ignore
    if (post.creatorEmail != email) {
      throw new UnAuthorized()
    }

    // @ts-ignore
    post.body = update.body
    await post.save()
    return post
  }

  async delete(id, email) {
    let post = await dbContext.Post.findById(id)
    // @ts-ignore
    if (post.creatorEmail != email) {
      throw new UnAuthorized()
    }
    await dbContext.Post.findByIdAndDelete(post.id)
  }
}

export const postsService = new PostsService();
