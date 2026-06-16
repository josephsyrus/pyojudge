import jwt from "jsonwebtoken";

export interface AccessTokenPayload {
  userId: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not set");
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m") as any,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not set");
  return jwt.verify(token, secret) as AccessTokenPayload;
}

export function signRefreshToken(payload: AccessTokenPayload): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not set");
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as any,
  });
}

export function verifyRefreshToken(token: string): AccessTokenPayload {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not set");
  return jwt.verify(token, secret) as AccessTokenPayload;
}

export function refreshTokenCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, //in ms
    path: "/",
  };
}
