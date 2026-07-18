import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken, requireAdmin, optionalAuthenticateToken } from "../utils/middleware";

const postsRouter = Router();

interface CreatePostBody {
  featured?: boolean;
  category: string;
  campus: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  images: string[];
  tags: string[];
}

interface PostParams {
  id: string;
}

function buildSentiment(comments: { sentiment: string }[]) {
  const total = comments.length;
  const counts = { positive: 0, neutral: 0, negative: 0 } as Record<string, number>;
  for (const c of comments) {
    if (counts[c.sentiment] !== undefined) counts[c.sentiment]++;
  }
  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
  return {
    positive: { count: counts.positive, percent: pct(counts.positive) },
    neutral:  { count: counts.neutral,  percent: pct(counts.neutral)  },
    negative: { count: counts.negative, percent: pct(counts.negative) },
  };
}

function enrichPost(
  post: any,
  currentUserId?: string
) {
  const { comments, likes, ...rest } = post;
  return {
    ...rest,
    likeCount: likes.length,
    commentCount: comments.length,
    likedByCurrentUser: currentUserId
      ? likes.some((l: any) => l.userId === currentUserId)
      : false,
    myLikeId: currentUserId
      ? likes.find((l: any) => l.userId === currentUserId)?.id ?? null
      : null,
    comments: comments.map((c: any) => ({
      id: c.id,
      content: c.content,
      sentiment: c.sentiment,
      createdAt: c.createdAt,
      postId: c.postId,
      userId: c.userId,
      author: c.user
        ? { id: c.user.id, name: c.user.name, role: c.user.role }
        : null,
    })),
    sentiment: buildSentiment(comments),
  };
}

const postInclude = {
  comments: {
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: "desc" as const },
  },
  likes: { select: { id: true, userId: true } },
};

// GET all posts — public (optional auth for likedByCurrentUser/myLikeId)
postsRouter.get("/", optionalAuthenticateToken, async (req: Request, res: Response) => {
  try {
    const { campus } = req.query;
    const currentUserId = req.user?.id;

    const posts = await prisma.post.findMany({
      where: campus ? { campus: String(campus) } : undefined,
      include: postInclude,
      orderBy: { id: "desc" },
    });

    res.json(posts.map((p) => enrichPost(p, currentUserId)));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET post by id — public (optional auth for likedByCurrentUser/myLikeId)
postsRouter.get(
  "/:id",
  optionalAuthenticateToken,
  async (req: Request<PostParams>, res: Response) => {
    try {
      const id = Number(req.params.id);
      const currentUserId = req.user?.id;

      const post = await prisma.post.findUnique({
        where: { id },
        include: postInclude,
      });

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.json(enrichPost(post, currentUserId));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  }
);

// CREATE post — admin only
postsRouter.post(
  "/",
  authenticateToken,
  requireAdmin,
  async (req: Request<{}, {}, CreatePostBody>, res: Response) => {
    try {
      const { featured, category, campus, date, title, excerpt, body, images, tags } =
        req.body;

      const post = await prisma.post.create({
        data: { featured, category, campus, date, title, excerpt, body, images, tags },
      });

      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create post" });
    }
  }
);



// UPDATE post — admin only
postsRouter.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  async (req: Request<PostParams, {}, Partial<CreatePostBody>>, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { featured, category, campus, date, title, excerpt, body, images, tags } =
        req.body;

      const post = await prisma.post.update({
        where: { id },
        data: { featured, category, campus, date, title, excerpt, body, images, tags },
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  }
);

// DELETE post — admin only
postsRouter.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  async (req: Request<PostParams>, res: Response) => {
    try {
      const id = Number(req.params.id);

      const post = await prisma.post.delete({ where: { id } });

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  }
);

module.exports = postsRouter;
