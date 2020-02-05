import React from "react";
import styled from "styled-components";

export const InfoBox = props => {
  return (
    <Box>
      {/* <img alt="comic book cover" src={props.cover_url} /> */}
      <ThumbNail src={props.cover_url} alt="comic book cover" />
      <BookInfo>
        <h3>{props.title}</h3>
        <span>{props.publisher}</span>
      </BookInfo>
      {/* <span>{props.creators}</span>
      <p>{props.description}</p> */}
    </Box>
  );
};

const Box = styled.div`
  max-width: 500px;
  border: 2px solid limegreen;
  display: flex;
  justify-content: flex-start;
`;

const ThumbNail = styled.img`
  max-width: 150px;
  box-shadow: 5px 5px 4px grey;
  margin: 10px 1%;
  margin-right: 5%;
`;

const BookInfo = styled.div`
  text-align: left;
`;
