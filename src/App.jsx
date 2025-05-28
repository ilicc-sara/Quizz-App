import { useState } from "react";

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

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(settings);

    const { inputNumber, selectCategory, selectDifficulty } = settings;

    let categoryNumber = "";
    if (selectCategory === "sports") categoryNumber = 21;
    if (selectCategory === "geography") categoryNumber = 22;
    if (selectCategory === "mythology") categoryNumber = 20;
    if (selectCategory === "art") categoryNumber = 25;

    const category = { sports: 21, geography: 22, mythology: 20, art: 25 };

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${inputNumber}&category=${categoryNumber}&difficulty=${selectDifficulty}&type=multiple`
        );
        const posts = await response.json();

        console.log("array of objects from http request", posts.results);

        setDisplayQuestions(true);

        posts.results.map((post, index) => {
          // if (post.type === "multiple") {
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
          // }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }

  console.log("array og objects", questions);

  function nextQuestion() {
    if (index !== questions.length - 1) setIndex((prev) => prev + 1);

    if (index === questions.length - 1) {
      console.log("game over");
    }
  }

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
            <span className="score_number-of-questions">
              {" "}
              {score} / {index + 1}{" "}
            </span>
          </div>
          <h2
            className="question"
            dangerouslySetInnerHTML={{ __html: questions[index].question }}
          ></h2>

          <div className="answers-container">
            <p
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
    </>
  );
}

export default App;
