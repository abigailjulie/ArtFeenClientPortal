import Client from "../models/Client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorHandler from "../middleware/errorHandler.js";

// desc Login
// route POST /auth
// access Public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  const foundClient = await Client.findOne({ username }).exec();

  if (!foundClient || !foundClient.active) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const match = await bcrypt.compare(password, foundClient.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const accessToken = jwt.sign(
    {
      ClientInfo: {
        username: foundClient.username,
        roles: foundClient.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundClient.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

// desc Refresh
// route GET /auth/refresh
// access Public
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden." });
      }

      const foundClient = await Client.findOne({ username: decoded.username });

      if (!foundClient) {
        return res.status(401).json({ message: "Unauthorized." });
      }

      const accessToken = jwt.sign(
        {
          ClientInfo: {
            username: foundClient.username,
            roles: foundClient.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// desc Logout
// route POST /auth/logout
// access Public
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

export default {
  login,
  refresh,
  logout,
};
