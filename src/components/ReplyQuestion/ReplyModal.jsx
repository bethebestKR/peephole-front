import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ReplyModal({ onClose, question, answerId, friendId }) {
  const [replyText, setReplyText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      // Handle the submission logic here (e.g., send the reply to a server)
      console.log("Submitted reply:", replyText);
      console.log("Answer ID:", answerId); // Answer ID 출력
      console.log("Friend ID:", friendId); // Friend ID 출력
      setReplyText(""); // Clear the textarea after submission

      try {
        const response = await axios.post(`/api/question`, {
          friendId: friendId,
          answer: replyText,
          answerId: answerId,
        });
        console.log("질문 응답 response:", response.data.body); // 응답 데이터
      } catch (error) {
        console.error("질문 응답 로드 실패:", error);
      }

      navigate("/peephole");
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setReplyText(text);
  };

  const isOverLimit = replyText.length > 300;

  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <CloseButton>
            <IoClose onClick={onClose} size={25} color="#5a786f" />
          </CloseButton>
        </Header>
        <QuestionContainer>
          <QuestionArea>{question}</QuestionArea>
        </QuestionContainer>
        <TextAreaContainer>
          <TextArea
            value={replyText}
            onChange={handleChange}
            placeholder="인터뷰 작성하기"
            overLimit={isOverLimit}
          />
          <CharCount>{replyText.length}/300</CharCount>
        </TextAreaContainer>
        <SendButton type="button" onClick={handleSubmit} disabled={isOverLimit}>
          보내기
        </SendButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  svg {
    position: absolute;
    right: 15px;
    top: 15px;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  padding: 50px 25px;
  gap: 80px;
  border-radius: 32px;
  width: 100%; /* Ensure it takes full width */
`;

const QuestionArea = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #535353;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  // margin-top:250px;
  
  align-items: flex-end; /* Align items to the bottom */
  justify-content: center;
  z-index: 100000;
`;

const ModalContent = styled.div`
  width: 498px;
  padding: 20px;
  border-radius: 18px 18px 0px 0px; /* Round top corners */
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0; /* Stick to the bottom */
  background-color: #f8f8f8;
`;

const SendButton = styled.button`
  width: 300px;
  height: 40px;
  font-size: 18px;
  display: flex;
  background-color: var(--hover-blue);
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 90%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 412px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid ${({ overLimit }) => (overLimit ? "red" : "#ccc")};
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
  background-color: #acacac80;
  background-color: ${({ overLimit }) => (overLimit ? "#FFE1E1" : "#acacac80")};
  color: black;
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바의 색상 */
    border-radius: 5px; /* 스크롤바의 둥근 모서리 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* 스크롤바에 마우스를 올렸을 때 색상 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 트랙의 색상 */
    border-radius: 5px; /* 스크롤바 트랙의 둥근 모서리 */
  }
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #555;
`;
