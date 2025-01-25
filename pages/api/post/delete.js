import { MongoCLient, ObjectId } from "mongodb";
import { connectDB } from '@/util/database';
import { useState, useEffect } from 'react';

// DB입출력 코드는 server component 안에서만 사용
export default async function handler(요청, 응답){

    console.log("delete로 postId 전달완료: " + 요청.body.postId)

    if (요청.method == 'DELETE'){

        try {
            const db = (await connectDB).db("forum")

            await db.collection('post').deleteOne(
            {
                _id : new ObjectId(요청.body)
            }
        )
        } catch (error) {
            "에러발생"
        }

        응답.status(200).redirect(302,'/')
    }
}