import React from 'react'

function PlayerWon(props) {
    return(
        <div>
            {props.player === 1 && <p>red wins</p>}
            {props.player === 2 && <p>black wins</p>}
            <button onClick={props.resetBoard}>Reset</button>
        </div>
    )
}

export default PlayerWon