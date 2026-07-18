import { Router, Request, Response } from "express";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import { authenticateToken, requireAdmin } from "../utils/middleware";

const uploadRouter = Router();

const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
      return;
    }
    cb(null, true);
  },
});

uploadRouter.post(
  "/",
  authenticateToken,
  requireAdmin,
  upload.array("images", 10),
  (req: Request, res: Response) => {
    const files = (req.files as Express.Multer.File[]) ?? [];

    if (files.length === 0) {
      res.status(400).json({ error: "No image files were uploaded" });
      return;
    }

    const urls = files.map((file) => `/uploads/${file.filename}`);
    res.status(201).json({ urls });
  }
);

// Multer errors (bad file type, too large, etc.) land here instead of the
// generic error handler so the client gets a useful message.
uploadRouter.use((error: any, _req: Request, res: Response, _next: any) => {
  res.status(400).json({ error: error.message || "Upload failed" });
});

module.exports = uploadRouter;
