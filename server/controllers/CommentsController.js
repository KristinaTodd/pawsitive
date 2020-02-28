import express from "express";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService.js";
import auth0Provider from "@bcwdev/auth0Provider";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await commentsService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getCommentById(req, res, next) {
    try {
      let data = await commentsService.getById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creator = req.userInfo.email;
      res.status(201).send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creator = req.userInfo.email
      res.status(202).send(req.params.id, req.body)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await commentsService.delete(req.params.id, req.userInfo.email)
      res.status(410).send("Spayed that comment")
    } catch (error) {
      next(error)
    }
  }

}
