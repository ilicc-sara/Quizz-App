import { useState } from "react";
import Form from "./Form.jsx";

import "./App.css";

function App() {
  const [settings, setSettings] = useState({
    inputNumber: "10",
    selectCategory: "sports",
    selectDifficulty: "easy",
  });

  const [displayQuestions, setDisplayQuestions] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  function handleCheckAnswer(answer) {
    if (index !== questions.length - 1) setIndex((prev) => prev + 1);

    if (index === questions.length - 1) {
      setGameOver(true);
    }

    if (questions[index].correct_answer === answer)
      setScore((prev) => prev + 1);
  }

  function nextQuestion() {
    if (index !== questions.length - 1) setIndex((prev) => prev + 1);

    if (index === questions.length - 1) {
      setGameOver(true);
    }
  }

  function playAgain() {
    setDisplayQuestions(false);
    setGameOver(false);
    setQuestions([]);
    setIndex(0);
    setScore(0);
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      {!displayQuestions && (
        <Form
          setQuestions={setQuestions}
          settings={settings}
          setSettings={setSettings}
          setDisplayQuestions={setDisplayQuestions}
        />
      )}
      {displayQuestions && (
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
            {/* <p
              className="single-question"
              onClick={() => {
                setScore((prev) => prev + 1);
                nextQuestion();
              }}
              dangerouslySetInnerHTML={{
                __html: questions[index].correct_answer,
              }}
            ></p>

            {questions[index].incorrect_answers.map((answer, index) => (
              <p
                key={index}
                className="single-question"
                onClick={() => nextQuestion()}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></p>
            ))} */}

            {shuffle(questions[index].answers).map((answer, index) => (
              <p
                key={index}
                className="single-question"
                onClick={() => handleCheckAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></p>
            ))}
          </div>

          <div className="next-question-div">
            <button
              className="next-question-btn"
              onClick={() => nextQuestion()}
            >
              Next question
            </button>
          </div>
        </main>
      )}

      {gameOver && (
        <div className="modal">
          <h3>Game Over!</h3>
          <p>
            You answered{" "}
            <b>
              {score} / {questions.length}
            </b>{" "}
            or <b>{Math.round((score / questions.length) * 100)}%</b> correctly!
          </p>
          <button className="play-again-btn" onClick={() => playAgain()}>
            Play again?
          </button>
        </div>
      )}

      {gameOver && <div className="overlay"></div>}
    </>
  );
}

export default App;

// loading before api
// shuffle answers
// pitaj kako da iskoristis objekad da postavis inpute i njihive brojeve
