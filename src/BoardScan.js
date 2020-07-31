export function boardScan(board) {
    // check for 4 connecting pieces
    // runs after every turn

    let playerWon = 0

    console.log('running board scan', board)

    const winCheck = (ar) => {
      // console.log(`checking array ${ar}`)
      for (let i = 1; i < 4; i++) {
        if (ar[0] !== ar[i]) {
          return;
        }
      }

      console.log('player won', ar[0])
      if(!playerWon){
        playerWon = ar[0]
      }
      return playerWon;
    };

    for (let y = 5; y >= 0; y--) {
      for (let x = 0; x < 7; x++) {
        let slopeDown = [];
        let vertical = [];
        let slopeUp = [];
        let horizontal = [];

        if (board[y][x] && y > 2 && x > 2) {
          slopeDown = [
            board[y][x],
            board[y - 1][x - 1],
            board[y - 2][x - 2],
            board[y - 3][x - 3],
          ];
          if(!playerWon){
            winCheck(slopeDown)
          }
        }

        if (board[y][x] && y > 2) {
          vertical = [
            board[y][x],
            board[y - 1][x],
            board[y - 2][x],
            board[y - 3][x],
          ];
          if(!playerWon){
            winCheck(vertical)
          }
        }

        if (board[y][x] && y > 2 && x < 4) {
          slopeUp = [
            board[y][x],
            board[y - 1][x + 1],
            board[y - 2][x + 2],
            board[y - 3][x + 3],
          ];
          if(!playerWon){
            winCheck(slopeUp);
          }
        }

        if (board[y][x] && x < 4) {
          horizontal = [
            board[y][x],
            board[y][x + 1],
            board[y][x + 2],
            board[y][x + 3],
          ];
          if(!playerWon){
            winCheck(horizontal)
          }
        }

        if(playerWon > 0){
          console.log('board scan', playerWon)
          return playerWon
        }
      }
    }

    return 0
  };