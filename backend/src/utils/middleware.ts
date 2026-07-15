import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as logger from "./logger";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");

  next();
};

export const authenticateToken = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authorization = request.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    response.status(401).json({ error: "token missing" });
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    request.user = decoded;
    next();
  } catch {
    response.status(401).json({ error: "token invalid or expired" });
  }
};

export const optionalAuthenticateToken = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  const authorization = request.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    try {
      request.user = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
    } catch {
      request.user = undefined;
    }
  }

  next();
};

export const requireAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (!request.user || request.user.role !== "ADMIN") {
    response.status(403).json({ error: "admin access required" });
    return;
  }
  next();
};

export const unknownEndpoint = (
  request: Request,
  response: Response
): void => {
  response.status(404).send({
    error: "unknown endpoint",
  });
};

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).json({ error: "malformatted id" });
    return;
  }

  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
    return;
  }

  if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "token invalid" });
    return;
  }

  if (error.name === "TokenExpiredError") {
    response.status(401).json({ error: "token expired" });
    return;
  }

  next(error);
};
