// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtUserPayload {
  userId: string;
  role: string; // add role here
}

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;
};