import Image from "next/image"; // 최적화된 이미지 적용을 위한 Import
import 작명 from '/public/food0.png'
import Link from "next/link";
import styles from "./page.module.css";
import { MongoCLient } from "mongodb";
import { connectDB } from '@/util/database';
import ListItem from './ListItem';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


// import DetailUseRouter from "./DetailuseRouter"

// dynamic rendering 구현
export const dynamic = 'force-dynamic'

// revalidate 얘약 변수를 통한 페이지 단위 캐싱 (페이지 방문시 60초동안 페이지 캐싱)
export const revalidate = 60;

export default async function Home() {

  // DB입출력 코드는 server component 안에서만 사용
  const db = (await connectDB).db("forum")
  let result = await db.collection('post').find().sort({_id: -1 }).toArray() // 컬렉션의 모든 Document 꺼내옴
  
  let adminStatus = await getServerSession(authOptions)

  return (
    <>
      {/* header는 layout에 위치 */}
      <main className="main">
          <div className="navbar-mobile-list">
              <button className="navbar-main-aboutme-mobile">About me</button>
              <button className="navbar-main-playground-mobile">Play ground</button>
          </div>
          <div className="main-section">
              <div className="main-ad">
                  Walker's Devlog
              </div>
              <div className="main-content">
                  <div className="main-content-main">
                      <div className="main-content-main-tab" style={{display: "none"}}>
                          main-content-main-tab
                      </div>
                      <div className="main-content-main-list">

                        <ListItem adminStatus={adminStatus}  result={result}/>

                      </div>
                  </div>
                  {/* sub 컨텐츠 추후 구현 예정 */}
                  <div className="main-content-sub" style={{display: 'none'}}>
                      <div className="main-content-sub-hotcontents">
                          <div className="main-content-sub-hotcontents-title">
                              인기 있는 글
                          </div>
                          <div className="main-content-sub-hotcontents01"></div>
                          <div className="main-content-sub-hotcontents02"></div>
                          <div className="main-content-sub-hotcontents03"></div>
                      </div>
                      <div className="main-content-sub-recentrepls">
                          <div className="main-content-sub-recentrepls-title">
                              최근 댓글
                          </div>
                          <div className="main-content-sub-recentrepls01"></div>
                          <div className="main-content-sub-recentrepls02"></div>
                          <div className="main-content-sub-recentrepls03"></div>
                      </div>
                      <div className="main-content-sub-tags">
                          태그들
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </>
  );  // return close 
} // function Home close


