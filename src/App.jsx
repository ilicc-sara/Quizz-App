import { useState } from "react";

import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState("10");

  const [selectCategory, setSelectCategory] = useState("sports");

  const [selectDifficulty, setSelectDifficulty] = useState("easy");

  const [displayQuestions, setDisplayQuestions] = useState(false);

  const [question, setQuestion] = useState({});

  const [number, setNumber] = useState(0);

  function handleSelectCategory(e) {
    setSelectCategory(e.target.value);
  }

  function handleSelectDifficulty(e) {
    setSelectDifficulty(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputNumber, selectCategory, selectDifficulty);

    let categoryNumber = "";
    if (selectCategory === "sports") categoryNumber = 21;
    if (selectCategory === "geography") categoryNumber = 22;
    if (selectCategory === "mythology") categoryNumber = 20;
    if (selectCategory === "art") categoryNumber = 25;

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${inputNumber}&category=${categoryNumber}&difficulty=${selectDifficulty}`
        );
        const posts = await response.json();
        console.log(posts);
        console.log(posts.results);
        console.log(posts.results[number].question);
        console.log(posts.results[number].correct_answer);
        console.log(posts.results[number].incorrect_answers);

        setDisplayQuestions(true);
        setQuestion({
          question: posts.results[number].question,
          correct_answer: posts.results[number].correct_answer,
          incorrect_answers: posts.results[number].incorrect_answers,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
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
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <br />
            <label>Category</label>
            <select className="select-category" onChange={handleSelectCategory}>
              <option value="sports">Sports</option>
              <option value="geography">Geography</option>
              <option value="mythology">Mythology</option>
              <option value="art">Art</option>
            </select>
            <br />
            <label>Difficulty</label>
            {/* prettier-ignore */}
            <select className="select-difficulty" onChange={handleSelectDifficulty}>
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
          <div className="score-tracker">Correct answers: 0 / 0</div>
          <h2 className="question">{question.question}</h2>

          <div className="answers-container">
            <p className="single-question" onClick={() => nextQuestion()}>
              {question.correct_answer}
            </p>
            {/* <p className="single-question">Sebastian Vettel</p>
            <p className="single-question">Jenson Button</p>
            <p className="single-question">Lewis Hamilton</p> */}

            {question.incorrect_answers.map((answer, index) => (
              <p
                key={index}
                className="single-question"
                onClick={() => nextQuestion()}
              >
                {" "}
                {answer}{" "}
              </p>
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
