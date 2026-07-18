import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken } from "../utils/middleware";

const CommentRouter = Router();
//const prisma = new PrismaClient();

interface CreateCommentBody {
  content: string;
  sentiment: string;
  postId: number;
}

CommentRouter.post(
  "/",
  authenticateToken,
  async (
    req: Request<{},{},CreateCommentBody>,
    res: Response
  ) => {
    try {
      const { content, sentiment, postId } = req.body;
      const userId = req.user!.id;
      const trimmedContent = content?.trim();

      if ( !trimmedContent || !sentiment || !postId ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const comment = await prisma.comment.create({
        data: {
          content: trimmedContent,
          sentiment,
          postId,
          userId
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
      });
      return res.status(201).json({
        id: comment.id,
        content: comment.content,
        sentiment: comment.sentiment,
        createdAt: comment.createdAt,
        postId: comment.postId,
        userId: comment.userId,
        author: comment.user,
      });
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
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: req.params.id },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.userId !== req.user!.id && req.user!.role !== "ADMIN") {
        return res.status(403).json({ error: "not allowed to delete this comment" });
      }

      await prisma.comment.delete({
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
