import React from 'react'

function PlayerWon(props) {
    return(
        <div className='modal'>
            <div className='win-modal'>
                {props.player === 1 && <h3>red wins</h3>}
                {props.player === 2 && <h3>black wins</h3>}
                <button onClick={props.resetBoard}>Reset</button>
            </div>
        </div>
    )
}

export default PlayerWon