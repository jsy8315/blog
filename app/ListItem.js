'use client'

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function ListItem(props){

    // client component에서 DB 데이터를 가져오는 방법 -> SEO를 위해 부모(이자 server component)에서 Props를 이용해 가져오자

    return(
        <>
        <div>
        {
            props.result.map(function(a,i){
              let postId = a._id.toString();
              console.log(postId)
              return(
                <>
                <Link prefetch={true}  postId={postId} style={{ textDecoration: "none", color: "black"}}  href={"/detail/" + postId}>
                  <div key={postId} className="main-content-thum">
                    <PostsText i={i} result={props.result}></PostsText>

                    {/* 관리자만 보이는 수정/삭제 버튼 */}
                    <div
                      style={{
                        display: props.adminStatus?.user?.name === "Suyoung Jung" ? "block" : "none",
                      }}
                    >
                      <Link prefetch={true} style={{ textDecoration: "none", color: "black"}}  
                        href={"/edit/" + postId }
                      >
                        <button>수정</button>
                      </Link>
                      {/* ajax를 사용한 삭제 요청 to 서버 */}
                      <button onClick={(event)=>{
                        event.stopPropagation();
                        event.preventDefault();
                         console.log('클릭됨요')
                          fetch("/api/post/delete",{
                              method : 'DELETE',
                              body : postId
                          })
                          .then(
                              ()=>{
                                  console.log("ajax를 활용한 삭제버튼 테스트")
                              }
                          )
                      }}>삭제</button>
                    </div>
                    <div className="main-content-thum-img-wrap">
                      <img src={a.thumbnail} alt="발행글 썸네일" className="main-content-thum-img"/>
                    </div>
                  </div>
                </Link>
                </>
                )
            })
        }
        </div>
        </>
    )
}


function PostsText(props){
    return(
      <>
        <div className="main-content-thum-text">
          <div className="main-content-thum-title" key={props.i}> 
            {props.result[props.i].title}
          </div>
          <div className="main-content-thum-intro">
            {props.result[props.i].intro}
          </div>
          <div className="main-content-thum-dateNtag">
            {props.result[props.i].date}{"     #"}
            {props.result[props.i].tag}
          </div>
        </div>
      </>
      
    )
  }