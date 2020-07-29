import React, { useState } from "react";
import { Route, Link } from "react-router-dom";

import Menu from "./components/menu";
import PvpBoard from "./components/pvp-board";
import AiBoard from "./components/ai-board";

import boardScan from './BoardScan'

function App(props) {
  let [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  let [player, setPlayer] = useState(1);
  let [score, setScore] = useState([0, 0]);

  const resetBoard = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    // setPlayerWon(0);
  };

  const resetWins = () => {
    setScore([0, 0])
  };

  const addPiece = (xAdd, player) => {
    for (let y = 5; y >= 0; y--) {
      if (board[y][xAdd] === 0) {
        //how to put a piece on board using hooks?.. need persistance after rerender

        setBoard((b) => {
          b[y] = b[y].map((place, index) => {
            if (index === xAdd) {
              return place + player;
            } else {
              return place;
            }
          });
          return b;
        });
        
        break;
      }
    }
    
    player === 1 ? setPlayer(2) : setPlayer(1);
    return;
    
  };

  return (
    <div className='App'>
      <header>
        <Link to='/' className='title'>
          Connect 4
        </Link>
      </header>
      <Route exact path='/' component={Menu} />
      <Route path='/local-pvp' component={PvpBoard} />
      <Route path='/local-ai'>
        <AiBoard
          addPiece={addPiece}
          resetBoard={resetBoard}
          resetWins={resetWins}
          // boardScan={boardScan}
          board={board}
          player={player}
          // playerWon={playerWon}
          // invalidColumn={invalidColumn}
          score={score}
        />
      </Route>
    </div>
  );
}

export default App;
