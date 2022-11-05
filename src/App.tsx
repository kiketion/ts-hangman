import { useCallback, useEffect, useState } from 'react';
import { Drawing } from './components/Drawing';
import { Word } from './components/Word';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordGuessed, setWordGessed] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordGuessed.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordGuessed
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetters(key);
    };
    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordGessed(getWord());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

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
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && 'Winner! - Refresh to try again'}
        {isLoser && 'Nice Try - Refresh to try again'}
      </div>
      <Drawing numberOfGuesses={incorrectLetters.length} />
      <Word
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordGuessed={wordGuessed}
      />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          activeLetters={guessedLetters.filter((letter) => {
            wordGuessed.includes(letter);
          })}
          inactiveLetters={incorrectLetters}
          addGuessedLetters={addGuessedLetters}
          disabled={isWinner || isLoser}
        />
      </div>
    </div>
  );
}

export default App;
