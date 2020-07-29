import React, { useState } from "react";
import { Link } from 'react-router-dom'

import aiPlayer from '../AiPlayer'
import { useBoardScan } from '../BoardScan'

import PlayerWon from './player-won'

function AiBoard(props) {
  const [moveCounter, setMoveCounter] = useState(0)
  const [invalidColumn, setInvalidColumn] = useState(false)
  const winner = useBoardScan(props.board)

  const humanAddPiece = i => {

    if(props.board[0][i] === 0){
      props.addPiece(i, props.player)
      console.log('player added piece')

      if(winner === 0){
        aiPlayer(props.board, props.addPiece)
      }

      setInvalidColumn(false)
    } else {
      setInvalidColumn(true)
    }
    
    setMoveCounter(moveCounter + 1)
    
  } 
  
  console.log('ai rerender', props.playerWon)

  return (
    <div className='board'>
      <div className='score-board'>
        <p>Human: {props.score[0]}</p>
        <p>AI: {props.score[1]}</p>
        <button onClick={props.resetWins}>Clear</button>
      </div>
      <div className='game-controls'>
        {props.board[0].map((val, index) => (
          <p
            key={index}
            className={props.player === 1 ? 'display-hidden one' : 'display-hidden two'}
            onClick={() => humanAddPiece(index)}
          />
        ))}
      </div>
      <div className='game'>
        {props.board.map((row, index) => (
          <div key={index} className='row'>
            {props.board[index].map((piece, i) => (
              <p key={i} className={piece === 0 ? "empty" : piece === 1 ? "p1" : "p2"} />
            ))}
          </div>
        ))}
      </div>
      <Link to='/'>Menu</Link>
      {invalidColumn && <p>invalid</p>}
      {winner > 0 && <PlayerWon playerWon={winner} resetBoard={props.resetBoard} />}
    </div>
  );
}

export default AiBoard;