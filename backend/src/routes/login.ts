import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const loginRouter = Router();

interface LoginBody {
  email: string;
  password: string;
}

loginRouter.post("/", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  const passwordCorrect =
    user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !passwordCorrect) {
    res.status(401).json({ error: "invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

module.exports = loginRouter;
