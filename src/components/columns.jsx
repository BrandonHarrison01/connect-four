import React, { useState, useEffect } from 'react'
import '../columns.scss'

function Columns() {
    let size = 5
    let boardSize = [[0]]

    //rerendering ↓ after every state change? setting value on every array to the same location of game piece?
    //useEffect hook?
    //... I don't think thats it, not causing a rerender
    for(let i = 1; i < size; i++){
        boardSize[0].push(0)
        boardSize.push(boardSize[0])
    }

    boardSize[2][4] = 'shite'
    console.log(boardSize, 'test')
    
    const addPiece = index => {
        for(let i = size - 1; i >= 0; i--){
            if(boardSize[i][index] === 0){
                boardSize[4][index] = '💩'
                break
            }
        }
        console.log(boardSize)
        return
    }

    console.log('rerender')

    return(
        <div className='board'>
            <div className='game-controls'>
                {boardSize.map((val, index) => <p className='display-hidden' onClick={() => addPiece(index)} />)}
            </div>
            {boardSize[0].map(row => 
                <div className='row'>
                    {boardSize.map(piece => <p className='empty'/>)}
                </div>)}
        </div>
    )
}

export default Columns