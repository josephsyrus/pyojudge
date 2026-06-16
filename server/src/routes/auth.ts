import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import crypto from "crypto";

import {
  signAccessToken,
  signRefreshToken,
  refreshTokenCookieOptions,
  verifyRefreshToken,
  pruneExpiredTokens,
  hashToken,
  makeTokenEntry,
} from "../services/tokenService";

const router = Router();
const BCRYPT_ROUNDS = 12; //2^12

const OAUTH_STATE_COOKIE = "oauth_state";

function oauthStateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 10 * 60 * 1000, // 10 minutes
    path: "/api/auth",
  };
}

function generateState(): string {
  return crypto.randomBytes(32).toString("hex");
}

function statesMatch(fromUrl: unknown, fromCookie: unknown): boolean {
  if (typeof fromUrl !== "string" || typeof fromCookie !== "string")
    return false;
  const a = Buffer.from(fromUrl);
  const b = Buffer.from(fromCookie);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  //checking validity of data
  if (!username || !email || !password) {
    res.status(400).json({
      message: "Username, email, and password are required",
    });
    return;
  }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    res.status(400).json({
      message: "Username must be 3–30 alphanumeric characters or underscores",
    });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({
      message: "Invalid email address",
    });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({
      message: "Password must be at least 8 characters",
    });
    return;
  }

  try {
    //search using either email or username
    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });
    if (existing) {
      const field =
        email.toLowerCase() === existing.email ? "Email" : "Username";
      res.status(409).json({ message: `${field} is already taken` });
      return;
    }

    //hashing and document creation
    const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashed,
    });

    //jwt
    const payload = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role, //default=user in schema
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    user.refreshTokens.push(makeTokenEntry(refreshToken)); //add to refreshToken array

    await user.save();

    //save the refreshToken in cookie
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());

    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    //check if user exist in db
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    //compare password
    if (!user.password) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    //create payload
    const payload = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    user.refreshTokens = pruneExpiredTokens(user.refreshTokens);
    user.refreshTokens.push(makeTokenEntry(refreshToken));
    await user.save();

    //save refreshtoken in cookie
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
    res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/refresh", async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken; //optional chaining
  if (!token) {
    res.status(401).json({ message: "No refresh token" });
    return;
  }

  try {
    const payload = verifyRefreshToken(token); //returns object
    const user = await User.findById(payload.userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    const tokenHash = hashToken(token);

    //user found, but token not in db list - incase of refreshtoken reuse attack
    if (!user.refreshTokens.some((t) => t.hash === tokenHash)) {
      user.refreshTokens = []; //wipe all refreshtokens
      await user.save();

      res.clearCookie("refreshToken");
      res
        .status(401)
        .json({ message: "Token reuse detected, all sessions invalidated" });
      return;
    }

    user.refreshTokens = user.refreshTokens.filter((t) => t.hash !== tokenHash); //removing current refreshtoken
    user.refreshTokens = pruneExpiredTokens(user.refreshTokens); //clear expired tokens from other sessions

    //making new refreshtoken
    const newPayload = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    user.refreshTokens.push(makeTokenEntry(newRefreshToken));
    await user.save();

    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions());
    res.json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.clearCookie("refreshToken");
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

router.post("/logout", async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      const user = await User.findById(payload.userId);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t.hash !== hashToken(token));
        await user.save();
      }
    } catch {
      //end session
    }
  }
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

router.get("/github", (_req: Request, res: Response): void => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const callbackUrl =
    process.env.GITHUB_CALLBACK_URL ??
    "http://localhost:5000/api/auth/github/callback";
  if (!clientId) {
    res.status(500).json({ message: "GitHub OAuth not configured" });
    return;
  }
  const state = generateState();
  res.cookie(OAUTH_STATE_COOKIE, state, oauthStateCookieOptions());
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=user:email&state=${state}`;
  res.redirect(url);
});

router.get(
  "/github/callback",
  async (req: Request, res: Response): Promise<void> => {
    const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
    const { code, state } = req.query;
    const cookieState = req.cookies?.[OAUTH_STATE_COOKIE];

    // The state cookie is single-use
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/api/auth" });

    if (!code || !statesMatch(state, cookieState)) {
      res.redirect(`${clientOrigin}/login?error=github_failed`);
      return;
    }

    try {
      // Exchange code for access token
      const tokenRes = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
          }),
        },
      );
      const tokenData = (await tokenRes.json()) as {
        access_token?: string;
        error?: string;
      };

      if (tokenData.error || !tokenData.access_token) {
        res.redirect(`${clientOrigin}/login?error=github_failed`);
        return;
      }

      const ghToken = tokenData.access_token;

      // Get GitHub user info
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${ghToken}`,
          "User-Agent": "pyojudge",
        },
      });
      const ghUser = (await userRes.json()) as {
        id: number;
        login: string;
        email: string | null;
      };

      // Always fetch from /user/emails to guarantee a verified primary email
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${ghToken}`,
          "User-Agent": "pyojudge",
        },
      });
      const emails = (await emailsRes.json()) as {
        email: string;
        primary: boolean;
        verified: boolean;
      }[];
      const email = emails.find((e) => e.primary && e.verified)?.email ?? null;

      if (!email) {
        res.redirect(`${clientOrigin}/login?error=github_no_email`);
        return;
      }

      // Find or create user
      let user = await User.findOne({ githubId: String(ghUser.id) });

      if (!user) {
        // Check if email already registered
        user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
          user.githubId = String(ghUser.id);
        } else {
          // New user
          let username = ghUser.login
            .replace(/-/g, "_")
            .replace(/[^a-zA-Z0-9_]/g, "")
            .slice(0, 30);
          if (username.length < 3) username = `gh_${username}`.slice(0, 30);

          const taken = await User.findOne({ username });
          if (taken)
            username =
              `${username.slice(0, 26)}_${String(ghUser.id).slice(-4)}`.slice(
                0,
                30,
              );

          user = await User.create({
            username,
            email: email.toLowerCase(),
            password: crypto.randomBytes(40).toString("hex"),
            githubId: String(ghUser.id),
          });
        }
      }
      const payload = {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const refreshToken = signRefreshToken(payload);
      user.refreshTokens = pruneExpiredTokens(user.refreshTokens);
      user.refreshTokens.push(makeTokenEntry(refreshToken));
      await user.save();

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
      res.redirect(`${clientOrigin}/auth/callback`);
    } catch (err) {
      res.redirect(`${clientOrigin}/login?error=github_failed`);
    }
  },
);

router.get("/google", (_req: Request, res: Response): void => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const callbackUrl =
    process.env.GOOGLE_CALLBACK_URL ??
    "http://localhost:5000/api/auth/google/callback";
  if (!clientId) {
    res.status(500).json({ message: "Google OAuth not configured" });
    return;
  }
  const state = generateState();
  res.cookie(OAUTH_STATE_COOKIE, state, oauthStateCookieOptions());
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    state,
  });
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );
});

router.get(
  "/google/callback",
  async (req: Request, res: Response): Promise<void> => {
    const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
    const callbackUrl =
      process.env.GOOGLE_CALLBACK_URL ??
      "http://localhost:5000/api/auth/google/callback";
    const { code, state } = req.query;
    const cookieState = req.cookies?.[OAUTH_STATE_COOKIE];

    // The state cookie is single-use
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/api/auth" });

    if (!code || !statesMatch(state, cookieState)) {
      res.redirect(`${clientOrigin}/login?error=google_failed`);
      return;
    }

    try {
      // Exchange code for access token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: callbackUrl,
          grant_type: "authorization_code",
        }),
      });
      const tokenData = (await tokenRes.json()) as {
        access_token?: string;
        error?: string;
      };

      if (tokenData.error || !tokenData.access_token) {
        res.redirect(`${clientOrigin}/login?error=google_failed`);
        return;
      }

      // Get user info from Google
      const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        },
      );
      const googleUser = (await userRes.json()) as {
        id: string;
        email: string;
        verified_email: boolean;
        name?: string;
      };

      if (!googleUser.email || !googleUser.verified_email) {
        res.redirect(`${clientOrigin}/login?error=google_no_email`);
        return;
      }

      // Find or create user
      let user = await User.findOne({ googleId: googleUser.id });

      if (!user) {
        user = await User.findOne({ email: googleUser.email.toLowerCase() });
        if (user) {
          user.googleId = googleUser.id;
        } else {
          // Derive a valid username from Google display name or email prefix
          const base = (googleUser.name ?? googleUser.email.split("@")[0])
            .replace(/[^a-zA-Z0-9_]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "")
            .slice(0, 30);
          let username = base.length >= 3 ? base : `user_${base}`.slice(0, 30);

          const taken = await User.findOne({ username });
          if (taken)
            username =
              `${username.slice(0, 26)}_${googleUser.id.slice(-4)}`.slice(
                0,
                30,
              );

          user = await User.create({
            username,
            email: googleUser.email.toLowerCase(),
            password: crypto.randomBytes(40).toString("hex"),
            googleId: googleUser.id,
          });
        }
      }

      const payload = {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const refreshToken = signRefreshToken(payload);
      user.refreshTokens = pruneExpiredTokens(user.refreshTokens);
      user.refreshTokens.push(makeTokenEntry(refreshToken));
      await user.save();

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
      res.redirect(`${clientOrigin}/auth/callback`);
    } catch {
      res.redirect(`${clientOrigin}/login?error=google_failed`);
    }
  },
);

export default router;
