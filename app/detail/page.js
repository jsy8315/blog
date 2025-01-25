
'use client' // 자바스크립트 기능을 넣기 위한 client component

import { useState } from "react"

export default function Detailtest() {
    let [like, setLike] = useState([0, 0, 0])
    return (
      <>
        <main className="main">
          <div className="navbar-mobile-list">
              <button className="navbar-main-aboutme-mobile">About me</button>
              <button className="navbar-main-playground-mobile">Play ground</button>
          </div>
        </main>
        <div className="main-section-admin">
          <h1>상세보기테스트페이지요</h1>
          <h1>상세보기테스트페이지요</h1>
          <h1>상세보기테스트페이지요</h1>
          <h1>상세보기테스트페이지요</h1>
          <h1>상세보기테스트페이지요</h1>
          <h1>상세보기테스트페이지요</h1>
          <h1 style={{color: 'red'}}>상세보기페이지요</h1>
          {
            like.map(function(a, i){
                return(
                <div key={i}>

                <span style={{ fontSize: '50px' }}>{like[i]}</span>
                <button
                    style={{ fontSize: '100px', width: '10%' }}
                    onClick={()=>{ 
                        let copyLike = [...like];
                        // copyLike[i]++
                        copyLike[i] = copyLike[i] == 0 ? copyLike[i] + 1 : copyLike[i] - 1;
                        setLike(copyLike);
                        }} >
                👍
                </button>

                </div>
                )
            })
          }
        </div>
      </>
    )
  } 