import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
    const db = (await connectDB).db('forum')
    const postId = 요청.query.postId;
    let result = await db.collection('comment').find({ parentId : new ObjectId(postId) }).toArray();
    console.log("가져온 댓글 데이터:", result);
    응답.status(200).json(result)
  }
