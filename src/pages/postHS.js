import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./postHS.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// 🔗 컴포넌트 import
import CursorEffect from "../component/commons/CursorEffect";
import Loader from "../component/commons/Loader";
import Badge from "../component/commons/Badge";
import ShareButtons from "../component/headerPost/ShareButtons";
import EmojiReactions from "../component/headerPost/EmojiReactions";

// 이미지 import
import logo from "../images/logo.svg";
// import arrowBottom from "../images/arrow_bottom.svg";
// import addEmoji from "../images/ico_add.svg";
import plusIcon from "../images/plus.svg";
import deleteIcon from "../images/ico_delete.svg";


// 각 문장마다 다른 폰트 적용하기
const FONT_STYLES = {
  notoSans: { fontFamily: '"Noto Sans", sans-serif' },
  pretendard: { fontFamily: '"Pretendard", sans-serif' },
  nanumMyeongjo: { fontFamily: '"나눔명조", serif' },
  NanumSonPyeonJiCe: {
    fontFamily: '"나눔손글씨 손편지체", sans-serif',
    fontSize: "24px",
  },
};

const Post = () => {
  // useNavigate 훅 추가
  const navigate = useNavigate();

  // api 데이터 저장 후 불러오기
  const { id } = useParams(); // URL에서 recipientId 가져오기
  console.log("🟢 Post_HS - URL에서 가져온 id:", id);

  // // 이모지 상태 관리
  // const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);
  // const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // const emojiRef = useRef(null);
  // const emojiListRef = useRef(null);

  // const toggleEmojiList = () => setIsEmojiListOpen((prev) => !prev);
  // const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  // // 외부 클릭 감지 기능 추가 (이모지 피커)
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (emojiRef.current && !emojiRef.current.contains(event.target)) {
  //       setIsEmojiPickerOpen(false);
  //     }
  //   }
  //   if (isEmojiPickerOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isEmojiPickerOpen]);

  // // 외부 클릭 감지 기능 추가 (이모지 리스트)
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       emojiListRef.current &&
  //       !emojiListRef.current.contains(event.target)
  //     ) {
  //       setIsEmojiListOpen(false); // 📌 이모지 리스트 외부 클릭 시 닫힘
  //     }
  //   }

  //   if (isEmojiListOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isEmojiListOpen]);

  // // 이모지 선택 시 처리
  // // const onEmojiClick = (emojiData) => {
  // //   console.log("선택된 이모지:", emojiData.emoji);
  // // };

  // const saveRecentEmoji = (emoji) => {
  //   let recentEmojis = JSON.parse(localStorage.getItem("recentEmojis")) || [];
  //   if (!recentEmojis.includes(emoji)) {
  //     recentEmojis.unshift(emoji);
  //     if (recentEmojis.length > 10) recentEmojis.pop(); // 최대 10개 저장
  //     localStorage.setItem("recentEmojis", JSON.stringify(recentEmojis));
  //   }
  // };

  // // 이모지 선택시 이모지 저장
  // const saveEmojiToLocal = (recipientId, emoji) => {
  //   let savedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || {}; // 객체 형태로 저장
  //   const recipientEmojis = savedEmojis[recipientId] || []; // 해당 recipient의 이모지 데이터 가져오기

  //   const existingEmoji = recipientEmojis.find((item) => item.emoji === emoji);

  //   if (existingEmoji) {
  //     existingEmoji.count += 1; // 이미 있는 이모지는 count 증가
  //   } else {
  //     recipientEmojis.push({ emoji, count: 1 }); // 새로운 이모지는 추가
  //   }

  //   savedEmojis[recipientId] = recipientEmojis; // recipientId별로 저장
  //   localStorage.setItem("savedEmojis", JSON.stringify(savedEmojis)); // localStorage에 저장
  // };

  // // 저장된 이모지 불러오기
  // const [emojiList, setEmojiList] = useState([]);

  // useEffect(() => {
  //   const storedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || {};
  //   setEmojiList(storedEmojis[id] || []); // 해당 recipientId의 이모지만 불러오기
  // }, [id]);

  // //api 요청함수
  // const sendEmojiReaction = async (recipientId, emoji, type = "increase") => {
  //   try {
  //     const response = await axios.post(
  //       `https://rolling-api.vercel.app/13-1/recipients/${id}/reactions/`,
  //       {
  //         emoji: emoji,
  //         type: type,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     console.log("✅ 이모지 반응 전송 성공:", response.data);
  //   } catch (error) {
  //     console.error("❌ 이모지 반응 전송 실패:", error);
  //   }
  // };


  // //이모지 데이터 가져오기
  // const fetchEmojiReactions = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://rolling-api.vercel.app/13-1/recipients/${id}/reactions/`
  //     );
  //     console.log("🎯 이모지 데이터:", response.data);  // ✅ 응답 데이터 확인
  
  //     if (Array.isArray(response.data)) {
  //       setEmojiList(response.data); // 배열인 경우에만 저장
  //     } else if (Array.isArray(response.data.results)) {
  //       setEmojiList(response.data.results); // results 배열이 있는 경우
  //     } else {
  //       console.error("❌ 예상하지 못한 데이터 형식:", response.data);
  //       setEmojiList([]); // 데이터가 배열이 아니면 빈 배열로 초기화
  //     }
  //   } catch (error) {
  //     console.error("❌ 이모지 데이터 불러오기 실패:", error);
  //     setEmojiList([]); // 에러 발생 시 빈 배열로 설정
  //   }
  // };

  
  // // 이모지 선택시 화면에 반영
  // const onEmojiClick = async (recipientId, emojiData) => {
  //   const emoji = emojiData.emoji;
  
  //   // ✅ 로컬 저장
  //   saveEmojiToLocal(recipientId, emoji);
  
  //   // ✅ API로 전송
  //   await sendEmojiReaction(recipientId, emoji, "increase");  // 이모지 전송
  //   fetchEmojiReactions(); // ✅ 이모지 데이터를 새로 불러오기
  
  //   // ✅ 화면 업데이트
  //   setEmojiList((prev) => {
  //     const updatedList = [...prev];
  //     const existingEmoji = updatedList.find((item) => item.emoji === emoji);
  
  //     if (existingEmoji) {
  //       existingEmoji.count += 1;
  //     } else {
  //       updatedList.push({ emoji: emoji, count: 1 });
  //     }
  
  //     return updatedList.sort((a, b) => b.count - a.count);
  //   });
  // };

  // // 이모지 카운트 수 상위 3개만 가져오기
  // const topEmojis = emojiList.slice(0, 3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const modalRef = useRef(null);
  //삭제모달 상태 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 모달 토글 함수 (카드 정보와 함께 모달 열기)
  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수 (일반 모달 + 삭제 모달)
  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false); // 삭제 모달도 닫기
  };

  // 외부 클릭 감지하여 모달 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isModalOpen || isDeleteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isDeleteModalOpen]);

  // 메시지 상태 관리
  const [messages, setMessages] = useState([]); // api에서 가져온 메세지 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [backgroundImage, setBackgroundImage] = useState(""); // 배경 이미지
  const [backgroundColor, setBackgroundColor] = useState(""); // 배경 색
  const [recipientName, setRecipientName] = useState(""); // 💡 수신자 이름 상태 추가


// 메시지 가져오기 (GET 요청)
const fetchMessages = async () => {
  try {
    console.log("🟢 API 요청 URL:", `https://rolling-api.vercel.app/13-1/recipients/${id}/messages/?limit=100`);

    const response = await axios.get(`https://rolling-api.vercel.app/13-1/recipients/${id}/messages/?limit=100`);
    console.log("📩 API 응답 데이터:", response.data);

    if (response.data.results) {
      setMessages(response.data.results);
    } else {
      console.error("❌ API 응답에서 results 배열이 없습니다.");
    }
  } catch (error) {
    console.error("❌ 메시지 불러오기 실패:", error);
  } finally {
    setLoading(false);
  }
};

//수신자 정보 가져오기 별도
const fetchRecipientData = async () => {
  try {
    console.log("🎯 수신자 정보 API 요청:", `https://rolling-api.vercel.app/13-1/recipients/${id}/`);
    
    const response = await axios.get(`https://rolling-api.vercel.app/13-1/recipients/${id}/`);
    console.log("📥 수신자 데이터:", response.data);

    // 배경 이미지와 색상 설정 이름 저장
    setRecipientName(response.data.name);
    setBackgroundImage(response.data.backgroundImageURL || "");
    setBackgroundColor(response.data.backgroundColor || "var(--beige-200)");

  } catch (error) {
    console.error("❌ 수신자 정보 불러오기 실패:", error);
  }
};


// useEffect에서 메시지 불러오기 실행
useEffect(() => {
  if (!id) {
    console.error("❌ recipientId가 없습니다.");
    setLoading(false);
    return;
  }

  fetchRecipientData();  // 배경 이미지 및 색상 가져오기
  fetchMessages();       // 메시지 가져오기
  // fetchEmojiReactions();
}, [id]);

// 총 작성자 수 계산
const totalWriters = messages.length;

// 최신 3개의 메시지 가져오기 (최신순으로 정렬 후 slice)
const latestProfiles = [...messages]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3);

// 초과 인원 수 계산
const extraWriters = totalWriters - latestProfiles.length;

// <!--------------------------- 메세지 삭제 기능 ------------------------->
const [passwordError, setPasswordError] = useState("");

const deleteMessage = async (messageId, password) => {
  try {
    const response = await axios.delete(
      `https://rolling-api.vercel.app/13-1/recipients/messages/${messageId}/`,
      {
        data: { password: password }, // API에 비밀번호 전달
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ 메시지 삭제 성공:", response.data);
    return true;
  } catch (error) {
    console.error("❌ 메시지 삭제 실패:", error.response?.data || error.message);
    return false;
  }
};

// 삭제 모달 열기 (선택된 메시지 정보 저장)
const openDeleteModal = (msg) => {
  setIsDeleteModalOpen(true);
  setSelectedCard(msg);
  setPasswordError("");

  // 💡 sender의 끝 4자리를 비밀번호로 사용
  const password = msg.sender.slice(-4); 
  // console.log("📌 추출된 비밀번호:", password); // 확인용 로그
  setSelectedCard((prev) => ({ ...prev, password }));  // 선택된 카드에 비밀번호 저장
};

// 삭제 처리 함수
const handleDelete = async () => {
  const enteredPassword = document.getElementById("pw").value; // 사용자가 입력한 비밀번호

  if (!enteredPassword) {
    setPasswordError(true); // 비번 입력 안 했을 때 오류 표시
    return; // 중단
  }

  const senderPassword = selectedCard.sender.slice(-4);         // sender의 마지막 4자리

  if (enteredPassword === senderPassword) {
    try {
      // ✅ API로 삭제 요청 보내기
      await axios.delete(
        `https://rolling-api.vercel.app/13-1/messages/${selectedCard.id}/`
      );

      // ✅ 삭제 성공 시 UI에서도 제거
      setMessages((prev) => prev.filter((msg) => msg.id !== selectedCard.id));
      closeModal();
      alert("✅ 메시지가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("❌ API 삭제 실패:", error);
      alert("❌ 메시지 삭제에 실패했습니다.");
    }
  } else {
    setPasswordError("비밀번호가 틀렸습니다."); // 비밀번호 틀렸을 때 오류 표시
  }
};



  return (
    <>
      <ToastContainer />
      <CursorEffect /> 
      {isModalOpen && selectedCard && (
        <div className="modal">
          <div className="modalContents" ref={modalRef}>
            <div className="modalHeader">
              <div>
                <div
                  className="photo"
                  style={{
                    backgroundImage: `url(${selectedCard.profileImageURL})`,
                  }}
                ></div>
                <div className="fromName">
                  <span>
                    From. <em>{selectedCard.sender}</em>
                  </span>
                  <Badge type={selectedCard.relationship} />
                </div>
              </div>
              <span className="date">
                {new Date(selectedCard.createdAt)
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, ".")}
              </span>
            </div>

            <div className="modalBody">
            <p className="content"
              style={{
                fontFamily: selectedCard.font,
                color: selectedCard.textColor || "#000",
                fontSize:
                  selectedCard.font === "나눔손글씨 손편지체"
                    ? "24px"
                    : selectedCard.fontSize || "18px",
                fontWeight: selectedCard.fontWeight || "normal",
                fontStyle: selectedCard.fontStyle || "normal",
              }}
              dangerouslySetInnerHTML={{ __html: selectedCard.content }} // ⭐ HTML 렌더링 추가
            />

            </div>

            <div className="modalBtn">
              <button onClick={() => setIsModalOpen(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div class="modal deleteMessageWrap">
          <div className={`modalContents ${passwordError ? "fail" : ""}`} ref={modalRef}>
            <strong>
              메세지를 삭제하려면
              <br />
              비밀번호를 입력해주세요.
            </strong>
            <div className="">
              <label for="pw"></label>
              <input type="password" id="pw" placeholder="비밀번호 입력" 
                onFocus={() => setPasswordError("")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setPasswordError("비밀번호를 입력해주세요.");
                  }
                }}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="modalBtn">
              <button onClick={handleDelete}>확인</button>
              <button className="cancelBtn" onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <header>
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="롤링페이퍼 로고" />
          </Link>
          {/* <Link to="/post" className="btn_making">롤링페이퍼 만들기</Link> */}
        </div>
      </header>
      <main>
        <h1 className="blind">보낸 롤링페이퍼 리스트</h1>
        {/* postHeader 시작 */}
        <div className="postHeader">
          <div className="container">
            <div className="leftWrap">
              <p>To. {recipientName || "수신자"}</p>
            </div>
            <div className="rightWrap">
              <div className="postWriterWrap">
                <div className="writerProfile">
                  {latestProfiles.map((msg, index) => (
                    <div
                      key={index}
                      className="profileImage"
                      style={{ backgroundImage: `url(${msg.profileImageURL})` }}
                    ></div>
                  ))}

                  {extraWriters > 0 && <span>+{extraWriters}</span>}
                </div>
                <p>
                  <em>{totalWriters}</em>명이 작성했어요!
                </p>
              </div>
              <EmojiReactions recipientId={id} />
              <ShareButtons backgroundImage={backgroundImage} backgroundColor={backgroundColor} />
            </div>
          </div>
        </div>
        {/* postHeader 끝 */}

        {/* 🔥 2️⃣ 메시지 로딩 상태 표시 */}
        {loading ? (
          <Loader />
        ) : (
          <div
            className="post"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              backgroundColor: backgroundColor || "var(--beige-200)",
            }}
          >
            <div className="container">
              {/* <p className="deletePostCard">
                <button>삭제하기</button>
              </p> */}
              <ul className="postCard">
                <li className="addPostCard">
                  <Link to={`/post/${id}/message`}>
                    <span>
                      <img src={plusIcon} alt="추가하기" />
                    </span>
                  </Link>
                </li>

                {/* 🔥 3️⃣ API에서 불러온 메시지 리스트 출력 */}
                {Array.isArray(messages) &&
                  messages.length > 0 &&
                  messages.map((msg) => (
                    <li key={msg.id} className="savedPostCard">
                      <a role="button" onClick={() => openModal(msg)}>
                        <div className="cardInfo">
                          <div>
                            <div
                              className="photo"
                              style={{
                                backgroundImage: `url(${msg.profileImageURL})`,
                              }}
                            ></div>
                            <div className="fromName">
                              <span>
                                From. <em>{msg.sender}</em>
                              </span>
                              <Badge type={msg.relationship} />
                            </div>
                          </div>
                          <a className="btnDelete"
                            onClick={(e) => {
                              e.stopPropagation(); // 💡 부모 클릭 이벤트 방지
                              openDeleteModal(msg); // 삭제 모달 열기 + 메시지 정보 전달
                            }}
                          >
                            <img src={deleteIcon} alt="삭제하기" />
                          </a>
                        </div>
                        <p className="content"
                          style={{
                            fontFamily: msg.font,
                            color: msg.textColor || "#000",
                            fontSize: msg.font === "나눔손글씨 손편지체" ? "24px" : msg.fontSize || "18px",
                            fontWeight: msg.fontWeight || "normal",
                            fontStyle: msg.fontStyle || "normal",
                          }}
                          dangerouslySetInnerHTML={{ __html: msg.content }} // ⭐ HTML 그대로 렌더링
                        />

                          <span className="date">
                            {new Date(msg.createdAt).toISOString().split("T")[0].replace(/-/g, ".")}
                          </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Post;