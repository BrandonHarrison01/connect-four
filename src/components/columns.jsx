import React from 'react'

import '../columns.scss'

class Columns extends React.Component {
    state = {
        board: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        player: 1
    }

        
    render() {

        const addPiece = (column, player) => {
            if(this.state.board[this.state.board.length - 1][column] === 0) {
                this.state.board[this.state.board.length - 1][column] = player
            } else if(this.state.board[0][column] > 0){
                console.log('cannot move there')
                return
            } else {
                for(let row = 1; row < this.state.board.length; row++){
                    if(this.state.board[row][column] > 0) {
                        this.state.board[row - 1][column] = player
                        if (player === 1){
                            this.state.player = 2
                        } else if(player === 2) {
                            this.state.player = 1
                        }
                        this.forceUpdate()
                        console.log(row - 1, column, 'return')
                        return
                    }
                    console.log(row, column)
                }
            }
            if (player === 1){
                this.state.player = 2
            } else if(player === 2) {
                this.state.player = 1
            }
            console.log(this.state.board.length)
            this.forceUpdate()
        }

        return (
            <div>
                <div className={this.state.player === 2 ? "display-none" : ""}>
                    <h2>Player 1</h2>
                    <button onClick={() => addPiece(0, 1)}>butt 1</button>
                    <button onClick={() => addPiece(1, 1)}>butt 2</button>
                    <button onClick={() => addPiece(2, 1)}>butt 3</button>
                    <button onClick={() => addPiece(3, 1)}>butt 4</button>
                </div>
                <div className={this.state.player === 1 ? "display-none" : ""}>
                    <h2>Player 2</h2>
                    <button onClick={() => addPiece(0, 2)}>butt 1</button>
                    <button onClick={() => addPiece(1, 2)}>butt 2</button>
                    <button onClick={() => addPiece(2, 2)}>butt 3</button>
                    <button onClick={() => addPiece(3, 2)}>butt 4</button>
                </div>
                {this.state.board.map(board => <h1>{board}</h1>)}
            </div>
        )
    }
}

export default Columns