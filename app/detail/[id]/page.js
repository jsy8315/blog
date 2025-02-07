import Image from "next/image"; // 최적화된 이미지 적용을 위한 Import
import Link from "next/link";
import React from "react";
import Comment from "./Comment";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostById } from '../../lib/post';

export default async function Detail({params}) {
  
  const result = await getPostById(params.id);

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
                <Comment  parentId={params.id}/>
              </div>
          </div>
      </main>
    </>
  );  // return close 
} // function Home close

