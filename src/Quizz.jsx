import React, { useState } from "react";
import Answer from "./Answer";

function Quizz(props) {
  const { questions, score, index, handleCheckAnswer, nextQuestion } = props;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return (
    <main className="questions-main">
      <div className="score-tracker">
        Correct answers:{" "}
        <b>
          {score} / {index + 1}
        </b>
      </div>
      <h2
        className="question"
        dangerouslySetInnerHTML={{ __html: questions[index].question }}
      ></h2>

      <div className="answers-container">
        {shuffle(questions[index].answers).map((answer, index) => (
          <Answer
            key={index}
            answer={answer}
            handleCheckAnswer={handleCheckAnswer}
          />
        ))}
      </div>

      <div className="next-question-div">
        <button className="next-question-btn" onClick={() => nextQuestion()}>
          Next question
        </button>
      </div>
    </main>
  );
}

export default Quizz;
