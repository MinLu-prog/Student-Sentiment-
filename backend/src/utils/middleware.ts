import { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
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

// These are generic over the same params Express's own RequestHandler is
// (P, ResBody, ReqBody, ReqQuery). Without this, a plain `Request`-typed
// middleware placed before a route handler that uses a more specific
// `Request<{ id: string }>` (or similar) breaks TypeScript's overload
// resolution for router.get/post/put/delete — it can no longer unify the
// handler chain against a single overload and reports confusing errors
// (a "string | string[] is not assignable to string" on req.params, or a
// "No overload matches this call" pointing at the error-handler overload).
// Making these generic lets each route instantiate them with its own types.
export const authenticateToken = <
  P = ParamsDictionary,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  request: Request<P, any, ReqBody, ReqQuery>,
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

export const optionalAuthenticateToken = <
  P = ParamsDictionary,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  request: Request<P, any, ReqBody, ReqQuery>,
  response: Response,
  next: NextFunction
): void => {
  const authorization = request.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    request.user = decoded;
  } catch {
    // invalid/expired token on an optional route: proceed as guest
  }

  next();
};

export const requireAdmin = <
  P = ParamsDictionary,
  ReqBody = any,
  ReqQuery = ParsedQs
>(
  request: Request<P, any, ReqBody, ReqQuery>,
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
