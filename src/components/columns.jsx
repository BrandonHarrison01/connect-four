import React, { useState, useEffect } from 'react'
import '../columns.scss'

function Columns() {
    let boardSize = [
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ] 
    ] 
    
    const addPiece = index => {
        for(let i = 5; i >= 0; i--){
            if(boardSize[i][index] === 0){
                boardSize[i][index] = 1
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
                {boardSize[0].map((val, index) => <p className='display-hidden' onClick={() => addPiece(index)} />)}
            </div>
            {boardSize.map(row => 
                <div className='row'>
                    {boardSize[0].map(piece => <p className='empty'/>)}
                </div>)}
        </div>
    )
}

export default Columns