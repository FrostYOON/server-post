import express from "express";
import User from "../models/user.js";

const router = express.Router({ mergeParams: true });

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, birthdate } = req.body;
    const createdUser = await User.create({
      username,
      email,
      password,
      birthdate,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { username, email } = req.query;
    const findUsers = await User.find({
      username: { $regex: `.*${username}.*`, $options: "i" },
      email: { $regex: `.*${email}.*`, $options: "i" },
    });
    res.status(200).json(findUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
