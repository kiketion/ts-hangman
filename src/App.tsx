import { useState } from 'react';
import { Drawing } from './components/Drawing';
import { Word } from './components/Word';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';

function App() {
  const [wordGuessed, setWordGessed] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [gessedLetters, setGuessedLetters] = useState<string[]>([]);

  console.log(wordGuessed);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>Lose Win</div>
      <Drawing />
      <Word />
      <Keyboard />
    </div>
  );
}

export default App;
