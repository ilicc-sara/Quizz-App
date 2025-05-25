import { useState } from "react";

import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState("10");

  const [selectCategory, setSelectCategory] = useState("sports");

  const [selectDifficulty, setSelectDifficulty] = useState("easy");

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`
  //       );
  //       const posts = await response.json();
  //       setCoctails(posts.drinks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchPost();
  // }, []);

  function handleSelectCategory(e) {
    setSelectCategory(e.target.value);
  }

  function handleSelectDifficulty(e) {
    setSelectDifficulty(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputNumber, selectCategory, selectDifficulty);

    let categoryNumber = 21;
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }

  return (
    <>
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

      <main className="questions-main hidden">
        <div className="score-tracker">Correct answers: 0 / 0</div>
        <h2 className="question">
          Who won the 2015 Formula 1 World Championship?
        </h2>

        <div className="answers-container">
          <p className="single-question">Nico Rosberg</p>
          <p className="single-question">Sebastian Vettel</p>
          <p className="single-question">Jenson Button</p>
          <p className="single-question">Lewis Hamilton</p>
        </div>

        <div className="next-question-div">
          <button className="next-question-btn">Next question</button>
        </div>
      </main>
    </>
  );
}

export default App;
