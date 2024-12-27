import mongoose, { Schema } from "mongoose";

// 스키마 정의 (데이터 구조 정의, 데이터 유효성 검사, 데이터 기본값 설정)
const PostSchema = new Schema(
  {
    title: { type: String, required: true }, // 제목
    content: { type: String, required: true }, // 내용
    likes: { type: Number, required: true, default: 0 }, // 좋아요 수
    views: { type: Number, required: true, default: 0 }, // 조회 수
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // 작성자 참조
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // 댓글 참조
    createdAt: { type: Date, required: true, default: Date.now }, // 생성 날짜
  },
  { timestamps: true } // 생성 날짜와 업데이트 날짜 자동 생성
);

// 모델 생성
const Post = mongoose.model("Post", PostSchema);

export default Post;
