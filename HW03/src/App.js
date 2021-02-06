import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { bullsAndCows, gameWon, hasDuplicates, randomNumber } from './game';

function App() {

  const [secret, setSecret] = useState(randomNumber);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  let guessView = bullsAndCows(guesses, secret);



  const [lives_left, setLives] = useState(8);

  function updateGuess(ev) {
    const re = /^[0-9\b]+$/;
    let text = ev.target.value;
    if (text.length > 3) {
      text = text[0] + text[1] + text[2] + text[3];
    }
    if (!re.test(text)) {
      text = text.substring(0, text.length - 1);
    }
    setGuess(text);
  }

  function makeGuess() {
    if (guess.length != 4) {
      
    }
    else if (hasDuplicates(guess)) {
      
    }
    else {
      setLives(lives_left - 1);
      setGuesses(guesses.concat(guess));
      setGuess("");
    }
  }


  function keypress(ev) {
    if (ev.key == "Enter") {
      makeGuess();
      }
  }

  function reset() {
    setGuesses([]);
    setLives(8);
    setSecret(randomNumber);
  }

  if (gameWon(guesses, secret)) {
    return (
      <div className = "App">
        <div class = "test">
          CS4550 Spring 2021 HW03
        </div>
        <h1 class = "title">
          Bulls and Cows
        </h1>
        <h3 class = "win">
          You Win!
        </h3>
        <p>
          The Secret Was {secret}
        </p>
        <button onClick={() => reset()}>
        Reset
        </button>
      </div>
      
    )

  }

  if (lives_left == 0) {
    return (
      <div className = "App">
        <div class = "test">
          CS4550 Spring 2021 HW03
        </div>
        <h1 class = "title">
          Bulls and Cows
        </h1>
        <h3 class = "lose">
          You Lose!
        </h3>
        <p>
          The Secret Was {secret}
        </p>
        <button onClick={() => reset()}>
        Reset
        </button>
      </div>
      
    )
  }

  return (
    
    <div className="App">
      <div class = "test">
        CS4550 Spring 2021 HW03
      </div>
      <h1 class = "title">
        Bulls and Cows
      </h1>
      <input type = "text"
             class = "guess"
             value={guess}
             onChange={updateGuess}
             onKeyPress={keypress}/>
      <div>
        <p>
          Guess The 4-Digit Sequence. No Duplicates Are Allowed. Must Guess 4 Digits.
        </p>
        <button onClick={makeGuess}>
          Guess
        </button>
        <button onClick={() => reset()}>
            Reset
        </button>
      </div>
      <h1>Guesses Left: {lives_left}</h1>
      <p class = "output">{guessView}</p>
      
      
    </div>
  );
}

export default App;
