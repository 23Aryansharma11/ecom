import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    if (typeof decoded !== "object" || !decoded.id) {
      res.status(401).json({ message: "Cannot authenticate user" });
      return;
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Cannot authenticate user" });
  }
}

export async function verifySeller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const role = req.role;
    if (role !== "seller") {
      res.status(401).json({ message: "Unauthorised" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Cannot authenticate user" });
  }
}