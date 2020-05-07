import React, { useState, useEffect } from "react";
import "../columns.scss";

function Columns() {
  let [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  let [player, setPlayer] = useState(1);

  const addPiece = (y, p) => {
    for (let x = 5; x >= 0; x--) {
      if (board[x][y] === 0) {
        
        //how to put a piece on board using hooks?.. need persistance after rerender
        
        setBoard(b => {
          b[x] = b[x].map((item, j) => {
            if(j === y){
              return item + p
            } else {
              return item
            }
          })
          return b
        })

        break;
      }
    }

    player === 1 ? setPlayer(2) : setPlayer(1);
    console.table(board);
    return;
  };

  console.log("rerender");
  console.table(board);

  return (
    <div className='board'>
      <div className='game-controls'>
        {board[0].map((val, index) => (
          <p
            className='display-hidden'
            onClick={() => addPiece(index, player)}
          />
        ))}
      </div>
      {board.map((row, index) => (
        <div className='row'>
          {board[index].map((piece) => (
            <p className={piece === 0 ? "empty" : piece === 1 ? "p1" : "p2"}>{piece}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Columns;
