import React, { useState, useEffect } from 'react'
import '../columns.scss'

function Columns() {
    let boardSize = [[0]]
    let [gameBoard, setGameBoard] = useState(boardSize)

    for(let i = 1; i < 4; i++){
       boardSize[0].push(0)
       boardSize.push(boardSize[0])
    }
    
    console.log(gameBoard)

    return(
        <div>
            {gameBoard.map(row => 
                <div className='row'>
                    {gameBoard[0].map(piece => <p className='empty'>he</p>)}
                </div>)}
        </div>
    )
}

export default Columns