'use client'

import { useState } from "react";

export default function NavbarList() {
  const [isListOpen, setIsListOpen] = useState(false); // 메뉴 열림 상태 관리

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    console.log('토글핸들러클릭')
    setIsListOpen((prev) => !prev);
  };

  // 새 탭 열기 핸들러
  const openNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="main-content-main-list">
      <div className={`navbar-main-list ${isListOpen ? "clicked" : ""}`} onClick={toggleMenu}>
        <img
          className="navbar-main-list-img"
          src="/open-menu-6208.svg"
          alt="Open Menu"
          style={{ display: isListOpen ? "none" : "block" }}
        />
        <img
          className="navbar-main-list-img-x"
          src="/xicon.svg"
          alt="Close Menu"
          style={{ display: isListOpen ? "block" : "none" }}
        />
      </div>

      {/* 모바일 메뉴 리스트 */}
      {isListOpen && (
        <div className="navbar-mobile-list">
          <button
            className="navbar-main-aboutme-mobile"
            onClick={() => openNewTab("https://www.naver.com")}
          >
            About Me
          </button>
          <button
            className="navbar-main-playground-mobile"
            onClick={() => alert("준비 중입니다!")}
          >
            Playground
          </button>
        </div>
      )}
    </div>
  );
}
