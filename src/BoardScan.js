export default function boardScan(board) {
    // check for 4 connecting pieces
    // runs after every turn

    console.log('running board scan', board)

    let winner = 0

    for (let y = 5; y >= 0; y--) {
      for (let x = 0; x < 7; x++) {
        let slopeDown = [];
        let vertical = [];
        let slopeUp = [];
        let horizontal = [];

        const winCheck = (ar) => {
          // console.log(`checking array ${ar}`)
          for (let i = 1; i < 4; i++) {
            if (ar[0] !== ar[i]) {
              return;
            }
          }

        //   setPlayer(1)
        //   setPlayerWon(ar[0]);
        //   console.log(playerWon)
        //   ar[0] === 1 ? setScore(prevScore => {
        //     prevScore[0]++
        //     return prevScore
        //   }) : setScore(prevScore => {
        //     prevScore[1]++
        //     return prevScore
        //   })
          winner = ar[0]
          return true;
        };

        if (board[y][x] && y > 2 && x > 2) {
          slopeDown = [
            board[y][x],
            board[y - 1][x - 1],
            board[y - 2][x - 2],
            board[y - 3][x - 3],
          ];
          winCheck(slopeDown)
        }

        if (board[y][x] && y > 2) {
          vertical = [
            board[y][x],
            board[y - 1][x],
            board[y - 2][x],
            board[y - 3][x],
          ];
          if(winCheck(vertical)){
              return winner
          }
        }

        if (board[y][x] && y > 2 && x < 4) {
          slopeUp = [
            board[y][x],
            board[y - 1][x + 1],
            board[y - 2][x + 2],
            board[y - 3][x + 3],
          ];
          winCheck(slopeUp);
        }

        if (board[y][x] && x < 4) {
          horizontal = [
            board[y][x],
            board[y][x + 1],
            board[y][x + 2],
            board[y][x + 3],
          ];
          if(winCheck(horizontal)){
              return winner
          }
        }
      }
    }

    // playerWon === 1 && setBlackWins((prev) => prev + 1);
    // playerWon === 2 && setRedWins((prev) => prev + 1);
    return 0
  };