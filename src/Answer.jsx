import React from "react";

function Answer(props) {
  const { answer, handleCheckAnswer } = props;
  return (
    <p
      className="single-answer"
      onClick={() => handleCheckAnswer(answer)}
      dangerouslySetInnerHTML={{ __html: answer }}
    ></p>
  );
}

export default Answer;
