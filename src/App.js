import { useState } from "react";
import './App.css'


// Componente de la casilla individual (Square)
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Componente del tablero (Board)
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);// Estado que gestiona si el siguiente turno es de "X" (true) o de "O" (false)
  const [square, setSquare] = useState(Array(9).fill(null));  // Estado que contiene el valor actual de las casillas del tablero (un array de 9 elementos)

  function handleClick(i) {
    if (calculateWinner(square) || square[i]) { // Si ya hay un ganador o la casilla está ocupada, se detiene la ejecución
      return;
    }

    const nextSquare = square.slice(); // Crea una copia del array de casillas
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    setSquare(nextSquare); // Actualiza el estado de las casillas
    setXIsNext(!xIsNext); // Cambia el turno al otro jugador
  }

  //  Muestra estado del juego
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner; // Muestra el ganador
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); //Muestra el turno
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columnas
    [0, 4, 8], [2, 4, 6]              // Diagonales
  ];
 // Recorre cada combinación de línea para ver si todas las casillas tienen el mismo valor (ganador)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a]; // Retorna el ganador ("X" o "O")
    }
  }
  return null;  // Si no hay ganador, retorna null
}
