import { Request, Response, NextFunction } from "express";
import {
  AccessTokenPayload,
  verifyAccessToken,
} from "../services/tokenService";

//adding payload to request type
export interface AuthRequest extends Request {
  user?: AccessTokenPayload;
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    next();
  });
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  //read the bearer token from client side
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const token = authHeader.slice(7); //remove 'Bearer '
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
}
