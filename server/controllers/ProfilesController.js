import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService.js";
import { commentsService } from "../services/CommentsService.js"

export class ProfilesController extends BaseController {


  constructor() {
    super("api/profile");
    this.router = express
      .Router()
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .get("/:id/posts", this.getPostsByProfileId)
      .get("/:id/comments", this.getCommentsByProfileId)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }

  async getPostsByProfileId(req, res, next) {
    try {
      let data = await postsService.getPostsByProfileId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByProfileId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByProfileId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await profilesService.delete(req.params.id)
    } catch (error) {
      next(error)
    }
  }

}
