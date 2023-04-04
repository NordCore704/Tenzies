import { useState, useEffect } from "react";
import "./App.css";
import SingleDice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [start, setStart] = useState(false);
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const randDie = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const [dice, setDice] = useState(randDie());
  const [tenzies, setTenzies] = useState(false);
  const [notTenzies, setNotTenzies] = useState(false);
  const allHeld = dice.every((die) => die.isHeld);
  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeldValues = dice.every((die) => die.value === firstValue);
    if (allHeld && allHeldValues) {
      setTenzies(true);
    } else {
      setNotTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((heldDice) =>
        heldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(randDie());
    }
  };

  const startTenzies = () => {
    setStart((prev) => !prev);
    setTenzies(false);
    setDice(randDie());
  };

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const dieMap = dice.map((dices) => (
    <SingleDice
      value={dices.value}
      isHeld={dices.isHeld}
      key={dices.id}
      holdDice={() => holdDice(dices.id)}
    />
  ));
console.log(allHeld);
  return (
    <>
      {tenzies && <Confetti />}
      {tenzies && (
        <>
          <div className="win--div">
            <h3>Congratulations, you have won! You have tenzies!😉</h3>{" "}
            <button className="roll--btn end" onClick={rollDice}>
              Play Again
            </button>
          </div>
        </>
      )}
      {/* {notTenzies && allHeld ? (
        <>
          <div className="win--div">
            <h3>Oh no, you have failed! You don't have tenzies!😔</h3>
            <button className="roll--btn end" onClick={startTenzies}>
              Try Again
            </button>
          </div>
        </>
      ) : (
        ''
      )} */}
      <div className="App">
        {start ? (
          <>
            <div className="main">
              <h1 className="title">Tenzies</h1>
              <p className="instructions">
                Roll until all die are the same. Click each die to freeze it at
                its current value between rolls
              </p>
              <div className="die--div">{dieMap}</div>

              <button onClick={rollDice} className="roll--btn">
                {tenzies ? "New Game" : "Roll"}
              </button>
              <button className="roll--btn end" onClick={() => setStart(false)}>
                End Game
              </button>
            </div>
          </>
        ) : (
          <div className="start">
            <h1 className="h1-small">
              Welcome to tenzies, the ultimate dice game
            </h1>
            <p>If you are ready to play, click the start button</p>
            <button className="roll--btn btn" onClick={startTenzies}>
              Start
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
