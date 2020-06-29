import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import PlayerWon from './player-won'

function AiBoard(props) {
  // ai runs after every player move
  // cheks for 3 connecting pieces if none builds on most connected ai
  // player === black === 1
  // computer === red === 2

  // NEED TO ACCOUNT FOR 2 AND 1 CONNECTION FOR SLOPES AND HORIZONTAL

  // since size of board is not dynamic o(n * 2) ! o(n^2)??

  useEffect(() => {
    if(props.blackMoves > 0){

      // DEFENSE

      // iterating through every space on the board
      for(let y = 5; y >= 0; y--){
        for(let x = 0; x < 7; x++){
          let current = props.board[y][x]
  
          if(current > 0){

            console.log(`checking slots ${y}, ${x}`)

            // VERTICAL CHECK
            // only checks valid spots     checks for 3 pieces of same color
            //   ↓                            ↓                 ↓
            if(y > 2 && current === props.board[y - 1][x] && current === props.board[y - 2][x]){
              // checks for empty top peice        
              //      ↓
              if(!props.board[y - 3][x]){
                console.log('vertical')
                props.addPiece(x, 2)
                return
              }
            }
            

            // HORIZONTAL CHECK
            // checks valid spots   checks 2 connecting pieces
            //   ↓                        ↓
            if(x < 6 && current === props.board[y][x + 1]){

              // if 3 connected pieces       4th piece is empty
              //          ↓                          ↓
              if(current === props.board[y][x + 2] && !props.board[y][x + 3]){
                // check that piece ends up in horizontal line when added
                //               ↓
                if(y === 5 || props.board[y + 1][x + 3] > 0){
                  console.log('horizontal 3')
                  props.addPiece(x + 3, 2)
                  return
                }
              }

              // if 2 and 1 connected pieces   3rd place is empty
              //         ↓                            ↓
              if(current === props.board[y][x + 3] && !props.board[y][x + 2]){
                // check that piece ends up in horizontal line when added
                //               ↓
                if(y === 5 || props.board[y + 1][x + 2] > 0){
                  console.log('horizontal 2 and 1')
                  props.addPiece(x + 2, 2)
                  return
                }
              }
              
              // checks valid places   if 1 and 2 connected pieces   2nd place is empty
              //  ↓                         ↓                        ↓
              if(x > 1 && current === props.board[y][x - 2] && !props.board[y][x - 1]){
                // check that piece ends up in horizontal line when added
                //               ↓
                if(y === 5 || props.board[y + 1][x - 1] > 0){
                  console.log('horizontal 1 and 2')
                  props.addPiece(x - 1, 2)
                  return
                }
              }
            } 
            

            // SLOPE UP CHECK
            //  valid area        2 connecting pieces
            //     ↓                      ↓
            if(x < 6 && y > 0 && current === props.board[y - 1][x + 1]){

              // three connecting
              //  valid area                      three connected
              //      ↓                                ↓
              if(y > 1 && x < 5 && current === props.board[y - 2][x + 2]){

                // bottom empty
                //   valid area        bottom of slope is empty
                //       ↓                    ↓
                if(y < 5 && x > 0 && !props.board[y + 1][x - 1]){
                  //   piece will stop where needed
                  //               ↓
                  if(y === 4 || props.board[y + 2][x - 1] > 0){
                    console.log('slope up 3 bottom')
                    props.addPiece(x - 1, 2)
                    return
                  }
                }

                // top empty
                // valid area
                //     ↓
                if(y > 2 && x < 4){
                  // place is empty          stops where needed
                  //      ↓                        ↓
                  if(!props.board[y - 3][x + 3] && props.board[y - 2][x + 3] > 0){
                    console.log('slope up 3 top')
                    props.addPiece(x + 3, 2)
                    return
                  }
                }
              }

              // 2 and 1 connected 3 is empty
              //    valid area         4th piece matches
              //       ↓                     ↓
              if(y > 2 && x < 4 && current === props.board[y - 3][x + 3]){
                // place is empty          stops where needed
                //     ↓                         ↓
                if(!props.board[y - 2][x + 2] && props.board[y - 1][x + 2] > 0){
                  console.log('slope up 2 and 1')
                  props.addPiece(x + 2, 2)
                  return
                }
              }

              // 1 and 2 connected 2nd is empty
              //    valid area             single piece match
              //       ↓                          ↓
              if(y < 4 && x > 1 && current === props.board[y + 2][x - 2]){
                //   place is empty           stops where needed
                //        ↓                         ↓
                if(!props.board[y + 1][x - 1] && props.board[y + 2][x - 1] > 0){
                  console.log('slope up 1 and 2')
                  props.addPiece(x - 1, 2)
                  return
                }
              }
            } 
            

            // SLOPE DOWN CHECK
            if(x > 0 && y > 0 && current === props.board[y - 1][x - 1]) {

              // three connecting pieces
              if(x > 1 && y > 1 && current === props.board[y - 2][x - 2]){

                // bottom empty
                // valid area        bottom of slope is empty
                //    ↓                      ↓
                if(y < 5 && x < 6 && !props.board[y + 1][x + 1]){
                  // stops where needed
                  //   ↓            ↓
                  if(y === 4 || props.board[y + 2][x + 1] > 0){
                    console.log('slope down 3 bottom')
                    props.addPiece(x + 1, 2)
                    return
                  }
                }

                // top empty
                // valid area        top of slope is empty
                //      ↓                    ↓
                if(y > 2 && x > 2 && !props.board[y - 3][x - 3]){
                  // stops where needed
                  //         ↓
                  if(props.board[y - 2][x - 3] > 0){
                    console.log('slope down 3 top')
                    props.addPiece(x - 3, 2)
                    return
                  }
                }
              }

              // 2 and 1 connecting pieces
              //   valid area          single piece match
              //      ↓                        ↓
              if(y < 4 && x < 4 && current === props.board[y + 2][x + 2]){
                //  empty space             piece stops at right place
                //      ↓                              ↓
                if(!props.board[y + 1][x + 1] && props.board[y + 2][x + 1] > 0){
                  console.log('slope down 2 and 1')
                  props.addPiece(x + 1, 2)
                  return
                }
              }

              // 1 and 2 connecting pieces
              //   valid area          single piece match
              //      ↓                        ↓
              if(y > 2 && x > 2 && current === props.board[y - 3][x - 3]){
                //  empty space             piece stops at right place
                //      ↓                              ↓
                if(!props.board[y - 2][x - 2] && props.board[y - 1][x - 2] > 0){
                  console.log('slope down 1 and 2')
                  props.addPiece(x - 2, 2)
                  return
                }
              }
            }


            // LOW PRIORITY DEFENSIVE MOVES

            // maybe run after every piece is checked????
            // if 2 connected pieces and previous piece is empty HORIZONTAL
            if(x > 0 && current === props.board[y][x + 1] && x < 6 && !props.board[y][x - 1]){
              if(y === 5 || props.board[y + 1][x - 1] > 0){
                console.log('horizontal 2')
                props.addPiece(x - 1, 2)
                return
              }
            }
          }
        }
      }

      // OFFENSE
       
      // ↓ UNCOMMENT FOR RANDOM PIECE PLACEMENT ↓
      let random = Math.random() * (7 - 1) + 1
      props.addPiece(Math.floor(random - 1), 2)
      return

      // ↓ UNCOMMENT FOR CONSISTENT PIECE PLACEMENT ↓
      // let last = 6
      // if(props.board[0][last] > 0){
      //   last--
      // }
      // console.log('last slot')
      // props.addPiece(last, 2)
      // return
    }

  }, [ props.blackMoves ])

  return (
    <div className='board'>
      <div className='score-board'>
        <p>Human: {props.blackWins}</p>
        <p>AI: {props.redWins}</p>
        <button onClick={props.resetWins}>Clear</button>
      </div>
      <div className='game-controls'>
        {props.board[0].map((val, index) => (
          <p
            key={index}
            className={props.player === 1 ? 'display-hidden one' : 'display-hidden two'}
            onClick={() => props.addPiece(index, props.player)}
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