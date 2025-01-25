import Image from "next/image"; // 최적화된 이미지 적용을 위한 Import
import Link from "next/link";
// import styles from "./page.module.css";
import { MongoCLient } from "mongodb";
import { connectDB } from '@/util/database';
import React from "react";
import { ObjectId } from "mongodb";

export default async function Edit(props){

    // DB입출력 코드는 server component 안에서만 사용
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) }) // 컬렉션의 중 title에 해당되는 게시물만 가져오기
    console.log("id출력: " + props.params.id)

    return (
        <div style={{ backgroundColor: "orange"}}>
            <h4>글수정페이지요</h4>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <h1>수정</h1>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <h4>글 수정 페이지</h4>
            <form action="/api/post/edit" method="POST" style={{ display: "flex", flexDirection: "column", width: '70%', justifyContent: "center"}}>
                <span>title</span>
                <input type="text" id='title' name="title"  defaultValue={result.title}></input>
                <br></br>

                <span>intro</span>
                <input type="text" id='intro' name="intro" defaultValue={result.intro}></input>
                <br></br>

                <span>content</span>
                <textarea type="text" rows="30" id='content' name="content" defaultValue={result.content}  style={{height: '500px'}}></textarea>
                <br></br>

                <span>tag</span>
                <select id='tag' name="tag" defaultValue={result.tag}>
                    <option value="Javascript">Javascript</option>
                    <option value="React">React</option>
                    <option value="ReactNative">ReactNative</option>
                    <option value="Typescript">Typescript</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                </select>
                <br></br>

                <span>like</span>
                <input type="number" id='like' name="like" defaultValue={0}></input>
                <br></br>
                <input type="hidden" name="_id" defaultValue={result._id.toString()} />
                <button type="submit">수정완료</button>

            </form>
        </div>
    )
}