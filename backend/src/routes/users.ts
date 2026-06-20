import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { authenticateToken, requireAdmin } from "../utils/middleware";

const userRoute = Router();

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

// GET /users — admin only
userRoute.get("/", authenticateToken, requireAdmin, async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  res.json(users);
});

// GET /users/:id — authenticated users
userRoute.get("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /users — admin only (create new user)
userRoute.post(
  "/",
  authenticateToken,
  requireAdmin,
  async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: "name, email and password are required" });
        return;
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = await prisma.user.create({
        data: { name, email, passwordHash, role: role ?? "USER" },
        select: { id: true, name: true, email: true, role: true },
      });

      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(400).json({ error: "email already in use" });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
);

// DELETE /users/:id — admin only
userRoute.delete("/:id", authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRoute;
