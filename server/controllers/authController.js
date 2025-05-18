const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const errorHandler = require("../middleware/errorHandler");

// desc Login
// route POST /auth
// access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
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
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundClient.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

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
    asyncHandler(async (err, decoded) => {
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
        { expiresIn: "1m" }
      );

      res.json({ accessToken });
    })
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

module.exports = {
  login,
  refresh,
  logout,
};
