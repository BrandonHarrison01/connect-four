import React, { useState, useEffect } from "react";
import "../columns.scss";

function Columns() {
  let boardSize = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let [player, setPlayer] = useState(1);

  const addPiece = (index, p) => {
    for (let i = 5; i >= 0; i--) {
      let playerMove = boardSize[i][index]
      if (boardSize[i][index] === 0) {
        
        //how to put a piece on board using hooks?.. need persistance after rerender
        boardSize[i][index] = p;
        break;
      }
    }
    player === 1 ? setPlayer(2) : setPlayer(1);
    console.log(boardSize);
    return;
  };

  console.log("rerender");
  console.table(boardSize);

  return (
    <div className='board'>
      <div className='game-controls'>
        {boardSize[0].map((val, index) => (
          <p
            className='display-hidden'
            onClick={() => addPiece(index, player)}
          />
        ))}
      </div>
      {boardSize.map((row, index) => (
        <div className='row'>
          {boardSize[index].map((piece) => (
            <p className={piece === 0 ? "empty" : piece === 1 ? "p1" : "p2"}>{piece}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Columns;
