import { useState } from "react";

import "./App.css";

function App() {
  const [settings, setSettings] = useState({
    inputNumber: "10",
    selectCategory: "sports",
    selectDifficulty: "easy",
  });

  const [displayQuestions, setDisplayQuestions] = useState(false);

  const [question, setQuestion] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(settings);

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
          `https://opentdb.com/api.php?amount=${inputNumber}&category=${categoryNumber}&difficulty=${selectDifficulty}`
        );
        const posts = await response.json();
        console.log(posts);
        console.log(posts.results);
        console.log(posts.results[0].question);
        console.log(posts.results[0].correct_answer);
        console.log(posts.results[0].incorrect_answers);

        setDisplayQuestions(true);
        setQuestion({
          question: posts.results[0].question,
          correct_answer: posts.results[0].correct_answer,
          incorrect_answers: posts.results[0].incorrect_answers,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }

  function nextQuestion() {}

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
            <span className="score_number-of-questions"> 0 / 0 </span>
          </div>
          <h2
            className="question"
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></h2>

          <div className="answers-container">
            <p className="single-question" onClick={() => nextQuestion()}>
              {question.correct_answer}
            </p>

            {question.incorrect_answers.map((answer, index) => (
              <p
                key={index}
                className="single-question"
                onClick={() => nextQuestion()}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></p>
            ))}
          </div>

          <div className="next-question-div">
            <button className="next-question-btn">Next question</button>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
