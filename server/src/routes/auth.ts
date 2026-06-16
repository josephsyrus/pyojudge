import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

import {
  signAccessToken,
  signRefreshToken,
  refreshTokenCookieOptions,
} from "../services/tokenService";

const router = Router();
const BCRYPT_ROUNDS = 12; //2^12

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
    user.refreshTokens.push(refreshToken); //add to refreshToken array

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
    user.refreshTokens.push(refreshToken);
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

export default router;
