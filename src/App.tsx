import { useCallback, useEffect, useState } from 'react';
import { Drawing } from './components/Drawing';
import { Word } from './components/Word';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';

function App() {
  const [wordGuessed, setWordGessed] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordGuessed.includes(letter)
  );

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

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
      <Drawing numberOfGuesses={incorrectLetters.length} />
      <Word guessedLetters={guessedLetters} wordGuessed={wordGuessed} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
