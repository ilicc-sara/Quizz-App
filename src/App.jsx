import { useState } from "react";
import Form from "./Form.jsx";
import Quizz from "./Quizz.jsx";
import GameOverModal from "./GameOverModal.jsx";

import "./App.css";

function App() {
  const [settings, setSettings] = useState({
    inputNumber: "10",
    selectCategory: "sports",
    selectDifficulty: "easy",
  });

  const [displayQuestions, setDisplayQuestions] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  function nextQuestion() {
    if (index !== questions.length - 1) setIndex((prev) => prev + 1);

    if (index === questions.length - 1) {
      setGameOver(true);
    }
  }

  function handleCheckAnswer(answer) {
    nextQuestion();

    if (questions[index].correct_answer === answer)
      setScore((prev) => prev + 1);
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
      {loading && <div class="loader"></div>}

      {!displayQuestions && (
        <Form
          setQuestions={setQuestions}
          settings={settings}
          setSettings={setSettings}
          setDisplayQuestions={setDisplayQuestions}
          setLoading={setLoading}
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
        <GameOverModal
          score={score}
          questions={questions}
          playAgain={playAgain}
        />
      )}

      {gameOver && <div className="overlay"></div>}
    </>
  );
}

export default App;

// kako postaviti loading spinner u fetch funkciji
// kada bih htela da dodam answers komponentu, da li bih je importovala u App.jsx ili u parent komponentu (quizz)
// zasto nisam koristila useEffect u ovom slucaju za loadovanje API-a
