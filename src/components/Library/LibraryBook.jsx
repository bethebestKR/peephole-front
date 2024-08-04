import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./OpenBook";

export default function LibraryBook({ title, questionId, colorCode, receiverName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newReceiverName = receiverName ? 
    (receiverName.length > 8 ? `#${receiverName.slice(0, 8)}...` : `# ${receiverName}`)
    : '';

  const handleClick = () => {
    if (title && questionId) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <BookContainer 
        colorCode={title && colorCode ? colorCode : 'transparent'} 
        hasData={!!title} 
        onClick={handleClick}
      >
        <ContentContainer>
          <Title>{title ? (title.length > 10 ? `${title.slice(0, 10)}...?` : title) : ''}</Title>
          <ReceiverName>{newReceiverName}</ReceiverName>
        </ContentContainer>
      </BookContainer>
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={title} 
          questionId={questionId} 
        />
      )}
    </>
  );
}

const BookContainer = styled.div`
  width: 106px;
  height: 140px;
  background: ${(props) => (props.hasData ? props.colorCode : 'rgba(255, 255, 255, 0.1)')}; 
  border: ${(props) => (props.hasData ? 'none' : '2px solid rgba(255, 255, 255, 0.2)')}; 
  display: flex;
  justify-content: center;
  align-items: flex-end; 
  border-radius: 30px 30px 10px 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.hasData ? 'pointer' : 'default')}; 
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
`;


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding: 5px; 
  width: 100%; 
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 13px;
  text-align: left;
  padding-left:4px;
  padding-bottom:5px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ReceiverName = styled.p`
  margin: 0;
  font-size: 12px;
  text-align: left; 
  padding-left:4px;
  padding-bottom:7px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Noto Sans KR', sans-serif; 
`;
