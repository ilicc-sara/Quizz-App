import React, { useState } from "react";

function Form(props) {
  // prettier-ignore
  const {  settings, setSettings, setQuestions, setDisplayQuestions, setLoading } = props;

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { inputNumber, selectCategory, selectDifficulty } = settings;

    const category = { sports: 21, geography: 22, mythology: 20, art: 25 };

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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }

  return (
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
  );
}

export default Form;
