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

  const addPiece = (xAdd, player) => {
    for (let y = 5; y >= 0; y--) {
      if (board[y][xAdd] === 0) {
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

  const resetBoard = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  };

  return (
    <div className='App'>
      <header>
        <Link to='/' className='title'>
          Connect 4
        </Link>
      </header>
      <Route exact path='/' component={Menu} />
      <Route path='/local-pvp' render={props =>  
        <PvpBoard
          {...props}
          addPiece={addPiece}
          resetBoard={resetBoard}
          board={board}
          player={player}
          // location={props.location}
        />
      }
      />
      <Route path='/local-ai' render={props => 
        <AiBoard
          {...props}
          addPiece={addPiece}
          resetBoard={resetBoard}
          board={board}
          player={player}
          // location={props.location}
        />
      }
      />
    </div>
  );
}

export default App;
