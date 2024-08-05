import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function QuestionAll() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/question");
      setQuestions(response.data.body.question); 
    } catch (error) {
      console.error("로드 실패 에러입니다!", error);
    }
  };

  const onClick = (data) => {
    navigate("/reply", { state: { answerId: data.answerId } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormContainer>
      {questions.map((data, index) => (
        <QuestionDiv key={index} onClick={() => onClick(data)}>
          <Title>
            <DateDiv>{formatDate(data.createdAt)}</DateDiv>
            <FriendDiv>{data.friendName}</FriendDiv>
          </Title>
          <ContentDiv>{data.questionName}</ContentDiv>
          <Profile
           src={`${process.env.PUBLIC_URL}/images/profile.png`}
           alt="logo"
           />
        </QuestionDiv>
      ))}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 400px;
  margin: 0 auto;
  height: 800px; 
  overflow-y: auto; 
  &::-webkit-scrollbar {
      display: none;
    }
  border-radius:10px;
  padding: 20px; 
  padding-top:50px;
  color: #fff;
  backdrop-filter: blur(10px); 
`;



const ContentDiv = styled.div`
  color: #fff;
  text-align: left;
  font-size: 16px;
  overflow: hidden;
  width: 270px;
  height: 52px;
  padding: 0 10px;
  line-height: 1.5;
  display: -webkit-box; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; 
  text-overflow: ellipsis;
  white-space: normal;
  box-sizing: border-box;
  position: relative; 
  top: -2px; 
  left:70px;
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
  position: absolute; 
  top:40px;
  margin-left: 0px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DateDiv = styled.div`
  color: #8E8E8E;
  text-align: left;
  font-size: 12px;
  width: 120px; 
  height: 40px; 
  font-weight: 100; 
  margin-top: -5px; 
  flex-shrink: 0; 
`;

const FriendDiv = styled.div`
  color: #2E90AF;
  text-align: left;
  font-size: 12px;
  margin-left: 10px; 
  margin-top: -25px; 
  font-weight: bold; 
`;

const QuestionDiv = styled.div`
  color: #fff;
  text-align: left;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid #8E8E8E;
  background-color: #d9d9d930;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  height: 126px;
  position: relative;

  
  &:hover {
    background-color: rgba(66, 170, 203, 0.5); 
    ${DateDiv} {
      color: #fff;
    }
    ${FriendDiv} {
      color: #fff;
    }
  }
`;