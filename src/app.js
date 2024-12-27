import express from "express";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";
import logger from "morgan";

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

export default app;
