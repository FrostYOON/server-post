import express from "express";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import Post from "../models/post.js";

const router = express.Router({ mergeParams: true });

// comment 생성
router.post("/", async (req, res) => {
  const { content, userId } = req.body;
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.postId);
    const commentCreated = await Comment.create({
      content,
      author: user._id,
      post: post._id,
    });
    user.comments.push(commentCreated._id);
    post.comments.push(commentCreated._id);
    await user.save();
    await post.save();
    res.status(201).json(commentCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// comment 조회
router.get("/", async (req, res) => {
  try {
    const { postId } = req.params.postId;
    const findComments = await Comment.find({
      post: postId,
    });
    res.status(200).json(findComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// comment 상세조회
router.get("/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const comments = await Comment.find({ post: postId });
    const findComment = comments.find((comment) => comment._id == commentId);
    res.status(200).json(findComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// comment 수정
router.put("/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const updateComment = await Comment.findByIdAndUpdate(
      { post: postId, _id: commentId },
      { content },
      { returnDocument: "after" } // 업데이트된 데이터 반환
    );
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// comment 삭제
router.delete("/:id", async (req, res) => {
  const deleteComment = await Comment.findByIdAndDelete(req.params.id);
  await User.updateOne(
    { comments: req.params.id },
    { $pull: { comments: req.params.id } }
  );
  await Post.updateOne(
    { comments: req.params.id },
    { $pull: { comments: req.params.id } }
  );
  res.status(204).json();
});

export default router;
