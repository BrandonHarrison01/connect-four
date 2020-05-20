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

  useEffect(() => {

    // check for 4 connecting pieces
    // runs after every turn


    // start at board[5][0]
      // iterate horizontally left to right then vertically bottom to top
      //(nested for loop outer representing y axis starting at 5 and decrementing. Inner representing x 0 to 6)
        // if > 0 
          // if [y][x] === [y - 1][x - 1]
          // if [y][x] === [y][x - 1]
          // if [y][x] === [y + 1][x + 1]
          // if [y][x] === [y - 1][x]
            // 1 and 2 more places in that direction are equal player wins

    for(let y = 5; y >= 0; y--){
      for(let x = 0; x < 7; x++){
        if(board[y][x] > 0 && board[y - 1]){
          if(board[y][x] === board[y - 1][x - 1]){
            console.log('player wins slope down')
          }
          if(board[y][x] === board[y - 1][x]){
            console.log('player wins vertical')
          }
          if(board[y][x] === board[y - 1][x + 1]){
            console.log('player wins slope up')
          }
          if(board[y][x] === board[y][x + 1]){
            console.log('player wins horizontal')
          }
        }
      }
    }
      







    console.log('runs when new piece added')
  }, [ player ])

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
    return;
  };

  return (
    <div className='board'>
      <div className='game-controls'>
        {board[0].map((val, index) => (
          <p
            className={player === 1 ? 'display-hidden one' : 'display-hidden two'}
            onClick={() => addPiece(index, player)}
          />
        ))}
      </div>
      {board.map((row, index) => (
        <div className='row'>
          {board[index].map((piece) => (
            <p className={piece === 0 ? "empty" : piece === 1 ? "p1" : "p2"} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Columns;
