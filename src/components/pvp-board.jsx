import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import PlayerWon from './player-won'
import { boardScan } from "../BoardScan";

function PvpBoard(props) {
  const [moveCounter, setMoveCounter] = useState(0)
  const [invalidColumn, setInvalidColumn] = useState(false)
  const [score, setScore] = useState([0, 0])
  const winner = boardScan(props.board)

  useEffect(() => {
    if(winner === 1){
      setScore(prevScore => {
        prevScore[0]++
        return prevScore
      })
    }
  
    if(winner === 2){
      setScore(prevScore => {
        prevScore[1]++
        return prevScore
      })
    }

    console.log(score)
  }, [winner, score])

  const resetWins = () => {
    setScore([0, 0])
  }

  const add = i => {

    if(props.board[0][i] === 0){
      props.addPiece(i, props.player)
      setInvalidColumn(false)

    } else {
      setInvalidColumn(true)
    }
    
    setMoveCounter(moveCounter + 1)
  } 

  return (
    <div className='board'>
      <div className='score-board'>
        <p>Red: {score[1]}</p>
        <p>Black: {score[0]}</p>
        <button onClick={resetWins}>Clear</button>
      </div>
      <div className='game-controls'>
        {props.board[0].map((val, index) => (
          <p
            key={index}
            className={props.player === 1 ? 'display-hidden one' : 'display-hidden two'}
            onClick={() => add(index)}
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
      <button onClick={() => props.history.push('/')}>Menu</button>
      {invalidColumn && <p>invalid</p>}
      {winner > 0 && <PlayerWon playerWon={winner} resetBoard={props.resetBoard} history={props.history} />}
    </div>
  );
}

export default PvpBoard;
