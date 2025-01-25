import { MongoCLient, ObjectId } from "mongodb";
import { connectDB } from '@/util/database';
import { useState, useEffect } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const ADMIN_EMAIL = process.env.GithubAllowedEmails;

// DB입출력 코드는 server component 안에서만 사용
export default async function handler(요청, 응답){
    const currentTime = new Date().toLocaleDateString();
    console.log("서버에서 id 출력: " + 요청.body._id) // undefined로 나오네

    const session = await getServerSession(요청, 응답, authOptions);

    if (!session) {
        // 인증되지 않은 경우
        return 응답.status(401).json({ message: "Unauthorized" });
    }
    
    if (session.user.email !== ADMIN_EMAIL) {
      // 관리자 이메일과 일치하지 않는 경우
      return 응답.status(403).json({ message: "Forbidden: 관리자 권한이 필요합니다." });
    }

    if (요청.method == 'POST'){
        요청.body.time = currentTime

        try {
            const db = (await connectDB).db("forum")

            await db.collection('post').updateOne(
            {
                _id : new ObjectId(요청.body._id)
            },    
            {

                $set: 
                    { 
                        title: 요청.body.title,
                        intro: 요청.body.intro,
                        content: 요청.body.content,
                        tag: 요청.body.tag,
                        like: 요청.body.like,
                        date: 요청.body.time, 
                    } 
                
            })
        } catch (error) {
            "에러발생"
        }

        // 요청 완료 확인
        // return 응답.status(200).json(
        //     요청.body
        // )

        응답.status(200).redirect(302,'/')
        
    }

    if (요청.method == 'GET'){
        return 응답.status(200).json("POST만 처리하는 edit.js입니다")
    }
}