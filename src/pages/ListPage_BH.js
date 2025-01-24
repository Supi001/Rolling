import React from "react";
import { useNavigate } from "react-router-dom";
import CardList_BH from "../Components_BH/CardList_BH"; // 올바른 경로 확인
import Navigation_BH from "../Components_BH/Navigation_BH"; // 올바른 경로 확인
import "./ListPage_BH.css";

function ListPage_BH() {
  const navigate = useNavigate();

  const popularItems = [
    { id: 1, title: "To. 안녕하세요", image: "/image1.jpg", stats: "1명이 작성했어요!" },
    { id: 2, title: "To. 홍보희", image: "/image2.jpg", stats: "1명이 작성했어요!" },
    { id: 3, title: "To. 테스트", image: "/image3.jpg", stats: "0명이 작성했어요!" },
    { id: 4, title: "To. 123", image: "/image4.jpg", stats: "3명이 작성했어요!" },
  ];

  const recentItems = [
    { id: 5, title: "To. 아", image: "/image5.jpg", stats: "1명이 작성했어요!" },
    { id: 6, title: "To. 집에있는데", image: "/image6.jpg", stats: "1명이 작성했어요!" },
    { id: 7, title: "To. 집에가고싶어", image: "/image7.jpg", stats: "0명이 작성했어요!" },
    { id: 7, title: "To. ㅠㅠㅠㅠ", image: "/image7.jpg", stats: "0명이 작성했어요!" },
  ];

  return (
    <div className="list-page">
      <Navigation_BH />

      <main className="list-content">
        <section className="list-section">
          <h2 className="section-title">인기 롤링 페이퍼 🔥</h2>
          <CardList_BH items={popularItems} />
        </section>

        <section className="list-section">
          <h2 className="section-title">최근에 만든 롤링 페이퍼 ⭐</h2>
          <CardList_BH items={recentItems} />
        </section>

        <div className="create-button-container">
          <button className="create-button" onClick={() => navigate("/post")}>
            나도 만들어보기
          </button>
        </div>
      </main>
    </div>
  );
}

export default ListPage_BH;
