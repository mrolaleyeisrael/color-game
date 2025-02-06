"use client";
import { useEffect, useState } from 'react';

const colors = [
  '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000',
  '#800000', '#008080', '#000080'
];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isGameActive, setIsGameActive] = useState(true);

  const generateNewGame = () => {
    const newTarget = colors[Math.floor(Math.random() * colors.length)];
    const options = [newTarget];

    while (options.length < 6) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }

    setTargetColor(newTarget);
    setColorOptions(options.sort(() => Math.random() - 0.5));
    setGameStatus('');
    setIsGameActive(true);
  };

  const handleGuess = (selectedColor: string) => {
    if (!isGameActive) return;

    if (selectedColor === targetColor) {
      setScore(prev => prev + 1);
      setGameStatus('Correct! Well done! 🎉');
      setIsGameActive(false);
    } else {
      setGameStatus('Wrong! Try again! ❌');
    }
  };

  useEffect(() => {
    generateNewGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div
        data-testid="colorBox"
        className="w-64 h-64 rounded-lg shadow-lg mb-8 transition-all duration-300"
        style={{ backgroundColor: targetColor }}
      ></div>

      <div
        data-testid="gameInstructions"
        className="text-xl font-semibold mb-6 text-gray-700 text-center"
      >
        Guess the color of the box above!
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            className={`h-20 rounded-lg shadow-md transition-all duration-200 hover:scale-105 
              ${isGameActive ? 'hover:shadow-lg' : 'opacity-75 cursor-not-allowed'}`}
            style={{ backgroundColor: color }}
            disabled={!isGameActive}
          ></button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div data-testid="score" className="text-2xl font-bold text-gray-700">
          Score: {score}
        </div>

        <div
          data-testid="gameStatus"
          className={`text-lg font-medium ${gameStatus.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}
        >
          {gameStatus}
        </div>

        <button
          data-testid="newGameButton"
          onClick={generateNewGame}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 
            transition-colors duration-200 shadow-md"
        >
          New Game
        </button>
      </div>
    </div>
  );
}