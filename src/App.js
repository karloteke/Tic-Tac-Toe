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
 function Board({xIsNext, square, onPlay}) {

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
    // Llama a la función onPlay pasándole las casillas actualizadas
    onPlay(nextSquare);
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


// Componente principal Game que maneja el historial de jugadas y el tablero
  export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);   // Estado que guarda el historial de movimientos, empezando con un tablero vacío
  
  const [currentMove, setCurrentMove] = useState(0);  // Estado que guarda el número de movimiento actual
  
  const xIsNext = currentMove % 2 === 0; // Si es par, le toca a "X"; si es impar, le toca a "O"
  
  const currentSquare = history[currentMove];  // Determina cuál es el tablero actual según el historial

  function handlePlay(nextSquares) {
    // Solo guardamos el historial hasta el movimiento actual (esto es importante si el jugador retrocede en la historia y hace una nueva jugada)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    setHistory(nextHistory);   // Actualizamos el historial con las nuevas casillas y avanzamos al siguiente movimiento
    setCurrentMove(nextHistory.length - 1); // El nuevo movimiento es el último en el historial
  }

  // Función para retroceder o avanzar a un movimiento específico
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);   // Cambia el estado del movimiento actual
  }

  // Crea una lista de botones para cada movimiento en el historial
  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {/* Al hacer clic en un botón, retrocede o avanza a ese movimiento */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Renderiza el juego: el tablero y la lista de movimientos
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
