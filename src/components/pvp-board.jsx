import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import PlayerWon from './player-won'

function PvpBoard() {
  let [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  let [player, setPlayer] = useState(1);
  let [playerWon, setPlayerWon] = useState(false)
  let [redWins, setRedWins] = useState(0)
  let [blackWins, setBlackWins] = useState(0)


  useEffect(() => {
    // check for 4 connecting pieces
    // runs after every turn

    for(let y = 5; y >= 0; y--){
      for(let x = 0; x < 7; x++){
        let slopeDown = []
        let vertical = []
        let slopeUp = []
        let horizontal = []

        const winCheck = ar => {
          for(let i = 1; i < 4; i++){
              if(ar[0] !== ar[i]){
                  return
              }
          }
          setPlayerWon(ar[0])
          return
      }

        if(board[y][x] && y > 2 && x > 2){
          slopeDown = [board[y][x], board[y-1][x-1], board[y-2][x-2], board[y-3][x-3]]
          winCheck(slopeDown)
        }
        
        if(board[y][x] && y > 2){
          vertical = [board[y][x], board[y-1][x], board[y-2][x], board[y-3][x]]
          winCheck(vertical)
        }
        
        if(board[y][x] && y > 2 && x < 4){
          slopeUp = [board[y][x], board[y-1][x+1], board[y-2][x+2], board[y-3][x+3]]
          winCheck(slopeUp)
        }
        
        if(board[y][x] && x < 4){
          horizontal = [board[y][x], board[y][x+1], board[y][x+2], board[y][x+3]]
          winCheck(horizontal)
        }
      }
    }

    playerWon === 1 && setBlackWins(prev => prev + 1)
    playerWon === 2 && setRedWins(prev => prev + 1)

  }, [ player, board, playerWon ])


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

  const resetBoard = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ])
    setPlayerWon(false)
  }

  const resetWins = () => {
    setRedWins(0)
    setBlackWins(0)
  }

  return (
    <div className='board'>
      <div className='score-board'>
        <p>Red: {redWins}</p>
        <p>Black: {blackWins}</p>
        <button onClick={resetWins}>Clear</button>
      </div>
      <div className='game-controls'>
        {board[0].map((val, index) => (
          <p
            key={index}
            className={player === 1 ? 'display-hidden one' : 'display-hidden two'}
            onClick={() => addPiece(index, player)}
          />
        ))}
      </div>
      <div className='game'>
        {board.map((row, index) => (
          <div key={index} className='row'>
            {board[index].map((piece, i) => (
              <p key={i} className={piece === 0 ? "empty" : piece === 1 ? "p1" : "p2"} />
            ))}
          </div>
        ))}
      </div>
      <Link to='/'>Menu</Link>
      {playerWon > 0 && <PlayerWon player={player} resetBoard={resetBoard} />}
    </div>
  );
}

export default PvpBoard;
