import { useState, useEffect } from 'react';
import Game from './src/components/Game.js';

function App() {

  const [gameId, setGameId] = useState(1);
  const [score, setScore] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(20);

  useEffect(() => {
    setGameId(1);
    setScore(0);
    setInitialSeconds(20)
  }, []);

  const resetGame = (isWon) => {
    if (isWon) {
      setScore(score + 1);
      setInitialSeconds(initialSeconds - 1);
    }
    else {
      setScore(0);
      setInitialSeconds(20);
    } 
    setGameId(gameId + 1);
  };

  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={6}
      initialSeconds={initialSeconds}
      score={score}
     />
  );
}

export default App;