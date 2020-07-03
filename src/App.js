import React, { useState } from "react";
import { Route, Link } from "react-router-dom";

import Menu from "./components/menu";
import PvpBoard from "./components/pvp-board";
import AiBoard from "./components/ai-board";

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
  let [playerWon, setPlayerWon] = useState(false);
  let [blackMoves, setBlackMoves] = useState(0);
  let [redWins, setRedWins] = useState(0);
  let [blackWins, setBlackWins] = useState(0);

  const boardScan = () => {
    // check for 4 connecting pieces
    // runs after every turn

    console.log('running board scan')

    for (let y = 5; y >= 0; y--) {
      for (let x = 0; x < 7; x++) {
        let slopeDown = [];
        let vertical = [];
        let slopeUp = [];
        let horizontal = [];

        const winCheck = (ar) => {
          console.log(`checking array ${ar}`)
          for (let i = 1; i < 4; i++) {
            if (ar[0] !== ar[i]) {
              return;
            }
          }

          setPlayerWon(ar[0]);
          console.log(playerWon, "player won");
          setBlackMoves(0);
          return;
        };

        if (board[y][x] && y > 2 && x > 2) {
          slopeDown = [
            board[y][x],
            board[y - 1][x - 1],
            board[y - 2][x - 2],
            board[y - 3][x - 3],
          ];
          winCheck(slopeDown);
        }

        if (board[y][x] && y > 2) {
          vertical = [
            board[y][x],
            board[y - 1][x],
            board[y - 2][x],
            board[y - 3][x],
          ];
          winCheck(vertical);
        }

        if (board[y][x] && y > 2 && x < 4) {
          slopeUp = [
            board[y][x],
            board[y - 1][x + 1],
            board[y - 2][x + 2],
            board[y - 3][x + 3],
          ];
          winCheck(slopeUp);
        }

        if (board[y][x] && x < 4) {
          horizontal = [
            board[y][x],
            board[y][x + 1],
            board[y][x + 2],
            board[y][x + 3],
          ];
          winCheck(horizontal);
        }
      }
    }

    playerWon === 1 && setBlackWins((prev) => prev + 1);
    playerWon === 2 && setRedWins((prev) => prev + 1);
    console.log(redWins, 'red')
    console.log(blackWins, 'black')
    return
  };

  const resetBoard = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    setPlayerWon(false);
  };

  const resetWins = () => {
    setRedWins(0);
    setBlackWins(0);
  };

  const addPiece = (xAdd, player) => {
    for (let y = 5; y >= 0; y--) {
      if (board[y][xAdd] === 0) {
        //how to put a piece on board using hooks?.. need persistance after rerender

        setBoard((b) => {
          b[y] = b[y].map((place, index) => {
            if (index === xAdd) {
              console.log('piece added')
              return place + player;
            } else {
              return place;
            }
          });
          console.log('calling board scan')
          boardScan();
          return b;
        });

        break;
      }
    }

    player === 1 && setBlackMoves((prev) => prev + 1);
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
          board={board}
          player={player}
          resetBoard={resetBoard}
          resetWins={resetWins}
          playerWon={playerWon}
          blackMoves={blackMoves}
          redWins={redWins}
          blackWins={blackWins}
        />
      </Route>
    </div>
  );
}

export default App;
