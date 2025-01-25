'use client'

import {signIn, signOut} from 'next-auth/react'

export default function Admin() {

    return (
      <>
        <main className="main">
          <div className="navbar-mobile-list">
              <button className="navbar-main-aboutme-mobile">About me</button>
              <button className="navbar-main-playground-mobile">Play ground</button>
          </div>
        </main>
        <div className="main-section-admin" style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <h1>관리자페이지요</h1>
          <button style={{width: '30%', 
                          height: '100px',
                          
                        }}
            onClick={()=>{
              signIn();
              router.push("/");
            }}
          >관리자로그인</button>
        </div>
      </>
    )
  } 