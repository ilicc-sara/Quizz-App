import React from "react";

function GameOverModal(props) {
  const { score, questions, playAgain } = props;
  return (
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
  );
}

export default GameOverModal;
