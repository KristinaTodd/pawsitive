import express from "express";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { commentsService } from "../services/CommentsService";
import auth0Provider from "@bcwdev/auth0Provider";

export class PostsController extends BaseController {
  constructor() {
    super("api/posts");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id/comments", this.getCommentsByPostId)
      .put("/:id", this.edit)
      .post("", this.create)
      .delete("/:id", this.delete)
  }
  async getAll(req, res, next) {
    try {
      let data = await postsService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      let data = await postsService.getById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByPostId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await postsService.create(req.body)
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await postsService.edit(req.params.id, req.body)
      res.status(202).send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await postsService.delete(req.params.id, req.userInfo.email)
      res.status(410).send("Neutered that post")
    } catch (error) {
      next(error)
    }
  }

}
