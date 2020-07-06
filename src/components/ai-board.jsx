import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

// import aiPlayer from '../AiPlayer'

import PlayerWon from './player-won'

function AiBoard(props) {
  const [moveCounter, setMoveCounter] = useState(0)

  const aiPlayer = (board, addPiece) => {

    // console.log(playerWon, 'adsfas')
    let last = 6
    if(board[0][last] > 0){
      last--
    }
    console.log('ai added piece')
    addPiece(last, 2)
    return
  }

  const humanAddPiece = i => {

    props.addPiece(i, props.player)

    setMoveCounter(moveCounter + 1)
    
  } 
  
  useEffect(() => {
    aiPlayer(props.board, props.addPiece)
  }, [ moveCounter ])

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
      {props.playerWon > 0 && <PlayerWon playerWon={props.playerWon} resetBoard={props.resetBoard} />}
    </div>
  );
}

export default AiBoard;