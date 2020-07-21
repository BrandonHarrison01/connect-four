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
  let [playerWon, setPlayerWon] = useState(0);
  let [invalidColumn, setInvalidColumn] = useState(false);
  let [score, setScore] = useState([0, 0]);

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
          // console.log(`checking array ${ar}`)
          for (let i = 1; i < 4; i++) {
            if (ar[0] !== ar[i]) {
              return;
            }
          }

          setPlayer(1)
          setPlayerWon(ar[0]);
          ar[0] === 1 ? setScore(prevScore => {
            prevScore[0]++
            return prevScore
          }) : setScore(prevScore => {
            prevScore[1]++
            return prevScore
          })
          return true;
        };

        if (board[y][x] && y > 2 && x > 2) {
          slopeDown = [
            board[y][x],
            board[y - 1][x - 1],
            board[y - 2][x - 2],
            board[y - 3][x - 3],
          ];
          winCheck(slopeDown)
        }

        if (board[y][x] && y > 2) {
          vertical = [
            board[y][x],
            board[y - 1][x],
            board[y - 2][x],
            board[y - 3][x],
          ];
          winCheck(vertical)
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

    // playerWon === 1 && setBlackWins((prev) => prev + 1);
    // playerWon === 2 && setRedWins((prev) => prev + 1);
    return false
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
    setPlayerWon(0);
  };

  const resetWins = () => {
    setScore([0, 0])
  };

  const addPiece = (xAdd, player) => {
    if(board[0][xAdd] > 0){
      // not setting invalid to true
      // seems to check board one move behind
      setInvalidColumn(true)
      console.log(`invalid column ${invalidColumn}`)
      return
    }

      for (let y = 5; y >= 0; y--) {
        if (board[y][xAdd] === 0) {
          //how to put a piece on board using hooks?.. need persistance after rerender
  
          setBoard((b) => {
            b[y] = b[y].map((place, index) => {
              if (index === xAdd) {
                // console.log('piece added')
                return place + player;
              } else {
                return place;
              }
            });
            // console.log('calling board scan')
            return b;
          });
          
          break;
        }
      }
      
      // player === 1 && setBlackMoves((prev) => prev + 1);
      setInvalidColumn(false)
      // boardScan();
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
          boardScan={boardScan}
          board={board}
          player={player}
          playerWon={playerWon}
          // invalidColumn={invalidColumn}
          score={score}
        />
      </Route>
      {invalidColumn  && <p>Can't add piece there</p>}
    </div>
  );
}

export default App;
