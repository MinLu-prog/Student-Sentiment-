import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const CommentRouter = Router();
//const prisma = new PrismaClient();

interface CreateCommentBody {
  content: string;
  sentiment: string;
  postId: number;
  userId: string
}

CommentRouter.post(
  "/",
  async (
    req: Request<{},{},CreateCommentBody>,
    res: Response
  ) => {
    try {
      const { content, sentiment, postId, userId } = req.body;
      if ( !content || !sentiment || !postId || !userId ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const comment = await prisma.comment.create({
        data: {
          content,
          sentiment,
          postId,
          userId
        },
      });
      return res.status(201).json(comment);
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

CommentRouter.get(
  "/",
  async (_req: Request, res: Response) =>{
    try {
      const comments = await prisma.comment.findMany({
        include: {
          user: true,
          post: true,
        },
        orderBy: {
          createdAt: "desc",
        }
      });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

CommentRouter.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if(!comment){
        return res.status(404).json({
          message: "Comment not found",
        });

      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json({
        message: "Faild to get comment",
      });
    }
  }
);

CommentRouter.delete(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const comment = await prisma.comment.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        message: "Comment deleted",
      });
    }
    catch (error) {
      return res.status(500).json({
        message: "Faild to delete comment",
      })
    }
  }
);

module.exports = CommentRouter;