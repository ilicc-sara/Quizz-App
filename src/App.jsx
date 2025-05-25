import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div className="form-container">
        <h1>Quiz setup</h1>

        <form className="setup-form">
          <label>Number of questions</label>
          <input type="number" value="10" />
          <br />
          <label>Category</label>
          <select className="select-category">
            <option value="sports">Sports</option>
            <option value="geography">Geography</option>
            <option value="mythology">Mythology</option>
            <option value="art">Art</option>
          </select>
          <br />
          <label>Difficulty</label>
          <select className="select-ifficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />
          <button>Start playing!</button>
        </form>
      </div>

      <main className="questions-main">
        <div className="score-tracker">Correct answers: 0 / 0</div>
        <h2 className="question">
          Who won the 2015 Formula 1 World Championship?
        </h2>

        <div className="answers-container">
          <p class="single-question">Nico Rosberg</p>
          <p class="single-question">Sebastian Vettel</p>
          <p class="single-question">Jenson Button</p>
          <p class="single-question">Lewis Hamilton</p>
        </div>

        <div className="next-question-div">
          <button className="next-question-btn">Next question</button>
        </div>
      </main>
    </>
  );
}

export default App;
