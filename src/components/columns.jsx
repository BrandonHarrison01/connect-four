import React from 'react'

import '../columns.scss'

class Columns extends React.Component {
    state = 
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        
    render() {

        const addPiece = (column, player) => {
            if(this.state[this.state.length - 1][column] === 0) {
                this.state[this.state.length - 1][column] = player
            } else if(this.state[0][column] > 0){
                console.log('cannot move there')
                return
            } else {
                for(let row = 1; row < this.state.length; row++){
                    if(this.state[row][column] > 0) {
                        this.state[row - 1][column] = player
                        this.forceUpdate()
                        console.log(row - 1, column, 'return')
                        return
                    }
                    console.log(row, column)
                }
            }
            console.log(this.state.length)
            this.forceUpdate()
        }

        return (
            <div>
                <div className="display-none">
                    <h2>Player 1</h2>
                    <button onClick={() => addPiece(0, 1)}>butt 1</button>
                    <button onClick={() => addPiece(1, 1)}>butt 2</button>
                    <button onClick={() => addPiece(2, 1)}>butt 3</button>
                    <button onClick={() => addPiece(3, 1)}>butt 4</button>
                </div>
                <div className="player-2">
                    <h2>Player 1</h2>
                    <button onClick={() => addPiece(0, 2)}>butt 1</button>
                    <button onClick={() => addPiece(1, 2)}>butt 2</button>
                    <button onClick={() => addPiece(2, 2)}>butt 3</button>
                    <button onClick={() => addPiece(3, 2)}>butt 4</button>
                </div>
                {this.state.map(board => <h1>{board}</h1>)}
            </div>
        )
    }
}

export default Columns