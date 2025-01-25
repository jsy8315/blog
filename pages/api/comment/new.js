import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
export default async function handler(요청, 응답) {
  if (요청.method == 'POST'){
    let 저장할거 = {
      commentId : 요청.body.commentId, //id
      content : 요청.body.content,  // 글제목
      parentId : new ObjectId(요청.body.parentId),
      commentProfileImg : 요청.body.commentProfileImg
    }
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').insertOne(저장할거);
    console.log(응답.body);

    응답.status(200).json({
        message: '저장완료',
        savedData: {
            _id : "DB에 저장될때 쓰였던 _id",
            commentId : 저장할거.commentId, 
            content : 저장할거.content,  
            parentId : 요청.body.parentId,
            commentProfileImg : 저장할거.commentProfileImg
        }
    })
  }
} 