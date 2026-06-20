import {Router, Request, Response} from 'express';
import {prisma} from '../lib/prisma';

const likeRouter = Router();

interface LikeParams {
  id: string;
}

interface CreateLikeBody {
  postId: number;
  userId: string;
}

likeRouter.get('/', async (req : Request, res: Response) => {
try {
  const likes = await prisma.like.findMany({
    include:{
      post: true,
      user: true
    }
  });
  res.json(likes);
} catch (error) {
  console.log(error);
  res.status(500).json({error: 'Internal server error'});
}
})

likeRouter.get(
  '/:id',
  async (
    req: Request<LikeParams>,
    res: Response
  ) => {
    try {
      const id = (req.params.id);
      const like = await prisma.like.findUnique({
        where: {
          id,
        }
      });
      res.json(like);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  }
)

likeRouter.post('/', async (req: Request<{}, {}, CreateLikeBody>, res: Response) => {
  try {
    const { postId, userId }= req.body;
    const like = await prisma.like.create({
      data: {
        postId,
        userId
      }
    })
    res.status(201).json(like);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

likeRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const like = await prisma.like.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!like) {
      return res.status(404).json({
        error: 'Like not found',
      });
    }

    await prisma.like.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Internal server error',
    });
  }
});


module.exports = likeRouter;