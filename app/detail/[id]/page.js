import Image from "next/image"; // 최적화된 이미지 적용을 위한 Import
import Link from "next/link";
// import styles from "./page.module.css";
import { MongoCLient } from "mongodb";
import { connectDB } from '@/util/database';
import React from "react";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function Detail(props) {
  
  // DB입출력 코드는 server component 안에서만 사용
  const db = (await connectDB).db("forum")
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) }) // 컬렉션의 중 title에 해당되는 게시물만 가져오기
  console.log(props.params.id)
  let postId = props.params.id;

  if (result === null) {
    return notFound()
  }

  return (
    <>
      {/* header는 layout에 위치 */}
      <main className="main">
          <div className="navbar-mobile-list">
              <button className="navbar-main-aboutme-mobile">About me</button>
              <button className="navbar-main-playground-mobile">Play ground</button>
          </div>
          <div className="main-section-detail">
              <img className="main-section-detail-thumImg-img" 
                   style={{
                    backgroundImage: `url(${result.thumbnail})`, 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "100% 100%"  
                  }} 
                   src={result.thumbnail}
              />
              <div className="main-section-detail-title">{result.title}</div>
              <div className="main-section-detail-tags">#{result.tag}</div>
              <div className="main-section-detail-author">Walker</div>
              <div className="main-section-detail-date">{result.date}</div>
              <div className="main-section-detail-content">
                <div className="markdown-body">
                  <ReactMarkdown>{result.content}</ReactMarkdown>
                </div>
              </div>
              <div className="main-section-detail-like">좋아요 {result.like}</div>
              <div className="main-section-detail-comments">
                <Comment  parentId={props.params.id}/>
              </div>
          </div>
      </main>
    </>
  );  // return close 
} // function Home close

