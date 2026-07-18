import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authenticateToken, requireAdmin } from "../utils/middleware";

const CampusTourStopRouter = Router();

interface CreateCampusTourStopBody {
  campus: string;
  name: string;
  description: string;
  duration: string;
  pinNumber?: number;
  type?: string;
  mapX?: number;
  mapY?: number;
  gallery?: { src: string; caption?: string }[];
  panorama?: any;
}

// Create — admin only
CampusTourStopRouter.post(
  "/",
  authenticateToken,
  requireAdmin,
  async (
    req: Request<{}, {}, CreateCampusTourStopBody>,
    res: Response
  ) => {
    try {
      const {
        campus,
        name,
        description,
        duration,
        pinNumber,
        type,
        mapX,
        mapY,
        gallery,
        panorama,
      } = req.body;

      if (!campus || !name || !description || !duration) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const stop = await prisma.campusTourStop.create({
        data: {
          campus,
          name,
          description,
          duration,
          pinNumber,
          type,
          mapX,
          mapY,
          gallery,
          panorama,
        },
      });

      return res.status(201).json(stop);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get All
CampusTourStopRouter.get(
  "/",
  async (_req: Request, res: Response) => {
    try {
      const stops = await prisma.campusTourStop.findMany();

      return res.status(200).json(stops);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get By Id
CampusTourStopRouter.get(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const stop = await prisma.campusTourStop.findUnique({
        where: {
          id: req.params.id,
        },
      });

      if (!stop) {
        return res.status(404).json({
          message: "Campus tour stop not found",
        });
      }

      return res.status(200).json(stop);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Update — admin only
CampusTourStopRouter.put(
  "/:id",
  authenticateToken,
  requireAdmin,
  async (
    req: Request<{ id: string }, {}, Partial<CreateCampusTourStopBody>>,
    res: Response
  ) => {
    try {
      const stop = await prisma.campusTourStop.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

      return res.status(200).json(stop);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Delete — admin only
CampusTourStopRouter.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      await prisma.campusTourStop.delete({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        message: "Campus tour stop deleted",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = CampusTourStopRouter;