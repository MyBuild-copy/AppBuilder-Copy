import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const Game = () => {
  const navigate = useNavigate();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"};`;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="game-container">
      <button onClick={handleLogout} className="btn btn-danger mb-3">
        NEW
      </button>
      <div className="game">
        <div className="status">{status}</div>
        <div className="board">
          {[...Array(3)].map((_, row) => (
            <div key={row} className="board-row">
              {[...Array(3)].map((_, col) => {
                const index = row * 3 + col;
                return (
                  <button
                    key={index}
                    className="square"
                    onClick={() => handleClick(index)}
                  >
                    {squares[index]}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
