import React from 'react'

function PlayerWon(props) {
    return(
        <div className='modal'>
            <div className='win-modal'>
                {props.playerWon === 1 && <h3>black wins</h3>}
                {props.playerWon === 2 && <h3>red wins</h3>}
                <button onClick={props.resetBoard}>Reset Board</button>
                <button onClick={() => props.history.push('/')}>Menu</button>
            </div>
        </div>
    )
}

export default PlayerWon