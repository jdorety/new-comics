import React from "react";

export const InfoBox = props => {
  return (
    <div className="box-container">
      <h3>{props.title}</h3>
      <span>{props.publisher}</span>
      <span>{props.creators}</span>
      <p>{props.description}</p>
    </div>
  );
};
