// DB 예시
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mongoose-test");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Connected to MongoDB");
});
