import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);
  const status = winner
    ? `O ${winner} venceu!`
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (index: number) => {
    const squaresCopy = squares.slice();
    if (squaresCopy[index] || winner) {
      return;
    }
    squaresCopy[index] = isXNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={`square ${square}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <div className="status">{status}</div>
      <button className="reset" onClick={resetGame}>Resetar Jogo</button>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
