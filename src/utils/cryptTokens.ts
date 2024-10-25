import jwt from "jsonwebtoken";
import { JwtPayload } from "../common/types/globalTypes";

// Replace with your secret or environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface MyJwtPayload {
    userId: string;
    email: string    
  }

/**
 * Generates a JWT token for a given payload
 * @param payload - Data to encode in the JWT token
 * @param expiresIn - Expiration time (e.g., "1h" for one hour)
 * @returns The signed JWT token
 */
export function generateToken(payload: object, expiresIn: string = "1h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifies and decodes a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded token payload if valid
 * @throws Error if token verification fails
 */
export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
