import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    content: { type: String, required: true }, // 댓글 내용
    likes: { type: Number, required: true, default: 0 }, // 좋아요 수
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // 작성자 참조
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // 게시글 참조
    createdAt: { type: Date, required: true, default: Date.now }, // 생성 날짜
  },
  { timestamps: true } // 생성 날짜와 업데이트 날짜 자동 생성
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
