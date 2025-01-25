// 예를 들어 저는 pages/api/test.js를 만들어봤습니다. 

// ages/api/ 폴더 안에 만든 파일과 폴더는 자동으로 서버기능의 URL이 됩니다. 

// 그래서 이제 유저가 /api/test 라는 URL로 GET/POST/PUT/DELETE 요청하면 test.js 안에 있는 코드가 실행됩니다
import { MongoCLient } from "mongodb";
import { connectDB } from '@/util/database';
import { useState, useEffect } from 'react';


export default async function handler(요청, 응답){
    const currentTime = new Date().toLocaleDateString();

    // DB입출력 코드는 server component 안에서만 사용
    const db = (await connectDB).db("forum")


    if (요청.method == 'POST'){
        // return 응답.status(200).json({currentTime})
        요청.body.time = currentTime
        db.collection('post').insertOne({
            title: 요청.body.title,
            intro: 요청.body.intro,
            content: 요청.body.content,
            tag: 요청.body.tag,
            like: 요청.body.like,
            date: 요청.body.time,
        })
        
        return 응답.status(200).json(
            요청.body
        )
        
    }

    if (요청.method == 'GET'){
        // DB입출력 코드는 server component 안에서만 사용
        const db = (await connectDB).db("forum");
        let resultGet = await db.collection('post').find().toArray();
        console.log(resultGet);
        return 응답.status(200).json(resultGet)
    }
}