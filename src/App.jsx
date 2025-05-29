import { useState } from "react";

import "./App.css";

function App() {
  const [settings, setSettings] = useState({
    inputNumber: "10",
    selectCategory: "sports",
    selectDifficulty: "easy",
  });

  const [displayQuestions, setDisplayQuestions] = useState(false);
  // napraviti konstantu allQuestions
  // random broj i random broj treba biti od 0 do arr.length
  // napravi folder components
  // u njemu napraviti minimum :
  // formu , quizz , i answers
  const [questions, setQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const { inputNumber, selectCategory, selectDifficulty } = settings;

    const category = { sports: 21, geography: 22, mythology: 20, art: 25 };
    console.log(category["sports"]);

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${inputNumber}&category=${category[selectCategory]}&difficulty=${selectDifficulty}&type=multiple`
        );

        const posts = await response.json();

        setDisplayQuestions(true);

        posts.results.map((post, index) => {
          setQuestions((previous) => [
            ...previous,
            {
              question: post.question,
              correct_answer: post.correct_answer,
              incorrect_answers: post.incorrect_answers,
              answers: [post.correct_answer, ...post.incorrect_answers],
              index: index,
            },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }

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
        <div className="form-container">
          <h1>Quiz setup</h1>

          <form className="setup-form" onSubmit={handleSubmit}>
            <label>Number of questions</label>
            <input
              type="number"
              value={settings.inputNumber}
              onChange={(e) =>
                setSettings((prev) => {
                  return { ...prev, inputNumber: e.target.value };
                })
              }
            />
            <br />
            <label>Category</label>
            <select
              className="select-category"
              onChange={(e) =>
                setSettings((prev) => {
                  return { ...prev, selectCategory: e.target.value };
                })
              }
            >
              <option value="sports">Sports</option>
              <option value="geography">Geography</option>
              <option value="mythology">Mythology</option>
              <option value="art">Art</option>
            </select>
            <br />
            <label>Difficulty</label>
            {/* prettier-ignore */}
            <select className="select-difficulty" onChange={(e) => setSettings((prev) => {
              return {...prev, selectDifficulty: e.target.value}
            })}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
            <br />
            <button>Start playing!</button>
          </form>
        </div>
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
