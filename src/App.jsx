import { useState } from "react";
import Form from "./Form.jsx";
import Quizz from "./Quizz.jsx";

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
        <Quizz
          questions={questions}
          score={score}
          index={index}
          handleCheckAnswer={handleCheckAnswer}
          nextQuestion={nextQuestion}
        />
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
