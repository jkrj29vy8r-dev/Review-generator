import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Error] ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(500).json({
    error: "Eroare internă de server",
    message:
      process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
