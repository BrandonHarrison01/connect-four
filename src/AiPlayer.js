export default function aiPlayer(board, addPiece) {
  // if(blackMoves > 0){

  // DEFENSE

  // iterating through every space on the board
  for (let y = 5; y >= 0; y--) {
    for (let x = 0; x < 7; x++) {
      let current = board[y][x];

      if (current > 0) {
        // console.log(`checking slots ${y}, ${x}`);

        // VERTICAL CHECK
        // only checks valid spots     checks for 3 pieces of same color
        //   ↓                            ↓                 ↓
        if (
          y > 2 &&
          current === board[y - 1][x] &&
          current === board[y - 2][x]
        ) {
          // checks for empty top peice
          //      ↓
          if (!board[y - 3][x]) {
            console.log("vertical");
            addPiece(x, 2);
            return;
          }
        }

        // HORIZONTAL CHECK
        // checks valid spots   checks 2 connecting pieces
        //   ↓                        ↓
        if (x < 6 && current === board[y][x + 1]) {
          // if 3 connected pieces       4th piece is empty
          //          ↓                          ↓
          if (current === board[y][x + 2] && !board[y][x + 3]) {
            // check that piece ends up in horizontal line when added
            //               ↓
            if (y === 5 || board[y + 1][x + 3] > 0) {
              console.log("horizontal 3");
              addPiece(x + 3, 2);
              return;
            }
          }

          // if 2 and 1 connected pieces   3rd place is empty
          //         ↓                            ↓
          if (current === board[y][x + 3] && !board[y][x + 2]) {
            // check that piece ends up in horizontal line when added
            //               ↓
            if (y === 5 || board[y + 1][x + 2] > 0) {
              console.log("horizontal 2 and 1");
              addPiece(x + 2, 2);
              return;
            }
          }

          // checks valid places   if 1 and 2 connected pieces   2nd place is empty
          //  ↓                         ↓                        ↓
          if (x > 1 && current === board[y][x - 2] && !board[y][x - 1]) {
            // check that piece ends up in horizontal line when added
            //               ↓
            if (y === 5 || board[y + 1][x - 1] > 0) {
              console.log("horizontal 1 and 2");
              addPiece(x - 1, 2);
              return;
            }
          }
        }

        // SLOPE UP CHECK
        //  valid area        2 connecting pieces
        //     ↓                      ↓
        if (x < 6 && y > 0 && current === board[y - 1][x + 1]) {
          // three connecting
          //  valid area                      three connected
          //      ↓                                ↓
          if (y > 1 && x < 5 && current === board[y - 2][x + 2]) {
            // bottom empty
            //   valid area        bottom of slope is empty
            //       ↓                    ↓
            if (y < 5 && x > 0 && !board[y + 1][x - 1]) {
              //   piece will stop where needed
              //               ↓
              if (y === 4 || board[y + 2][x - 1] > 0) {
                console.log("slope up 3 bottom");
                addPiece(x - 1, 2);
                return;
              }
            }

            // top empty
            // valid area
            //     ↓
            if (y > 2 && x < 4) {
              // place is empty          stops where needed
              //      ↓                        ↓
              if (!board[y - 3][x + 3] && board[y - 2][x + 3] > 0) {
                console.log("slope up 3 top");
                addPiece(x + 3, 2);
                return;
              }
            }
          }

          // 2 and 1 connected 3 is empty
          //    valid area         4th piece matches
          //       ↓                     ↓
          if (y > 2 && x < 4 && current === board[y - 3][x + 3]) {
            // place is empty          stops where needed
            //     ↓                         ↓
            if (!board[y - 2][x + 2] && board[y - 1][x + 2] > 0) {
              console.log("slope up 2 and 1");
              addPiece(x + 2, 2);
              return;
            }
          }

          // 1 and 2 connected 2nd is empty
          //    valid area             single piece match
          //       ↓                          ↓
          if (y < 4 && x > 1 && current === board[y + 2][x - 2]) {
            //   place is empty           stops where needed
            //        ↓                         ↓
            if (!board[y + 1][x - 1] && board[y + 2][x - 1] > 0) {
              console.log("slope up 1 and 2");
              addPiece(x - 1, 2);
              return;
            }
          }
        }

        // SLOPE DOWN CHECK
        if (x > 0 && y > 0 && current === board[y - 1][x - 1]) {
          // three connecting pieces
          if (x > 1 && y > 1 && current === board[y - 2][x - 2]) {
            // bottom empty
            // valid area        bottom of slope is empty
            //    ↓                      ↓
            if (y < 5 && x < 6 && !board[y + 1][x + 1]) {
              // stops where needed
              //   ↓            ↓
              if (y === 4 || board[y + 2][x + 1] > 0) {
                console.log("slope down 3 bottom");
                addPiece(x + 1, 2);
                return;
              }
            }

            // top empty
            // valid area        top of slope is empty
            //      ↓                    ↓
            if (y > 2 && x > 2 && !board[y - 3][x - 3]) {
              // stops where needed
              //         ↓
              if (board[y - 2][x - 3] > 0) {
                console.log("slope down 3 top");
                addPiece(x - 3, 2);
                return;
              }
            }
          }

          // 2 and 1 connecting pieces
          //   valid area          single piece match
          //      ↓                        ↓
          if (y < 4 && x < 4 && current === board[y + 2][x + 2]) {
            //  empty space             piece stops at right place
            //      ↓                              ↓
            if (!board[y + 1][x + 1] && board[y + 2][x + 1] > 0) {
              console.log("slope down 2 and 1");
              addPiece(x + 1, 2);
              return;
            }
          }

          // 1 and 2 connecting pieces
          //   valid area          single piece match
          //      ↓                        ↓
          if (y > 2 && x > 2 && current === board[y - 3][x - 3]) {
            //  empty space             piece stops at right place
            //      ↓                              ↓
            if (!board[y - 2][x - 2] && board[y - 1][x - 2] > 0) {
              console.log("slope down 1 and 2");
              addPiece(x - 2, 2);
              return;
            }
          }
        }

        // LOW PRIORITY DEFENSIVE MOVES

        // maybe run after every piece is checked????
        // if 2 connected pieces and previous piece is empty HORIZONTAL
        if (x > 0 && current === board[y][x + 1] && x < 6 && !board[y][x - 1]) {
          if (y === 5 || board[y + 1][x - 1] > 0) {
            console.log("horizontal 2");
            addPiece(x - 1, 2);
            return;
          }
        }
      }
    }
  }

  // OFFENSE

  // ↓ UNCOMMENT FOR RANDOM PIECE PLACEMENT ↓
  // let random = Math.floor((Math.random() * 7 + 1) - 1)
  // let newInt = true
  // while(newInt){
  //     if(board[0][random] > 0){
  //         console.log(`${random} column full choosing new number`)
  //         random = Math.floor((Math.random() * 7 + 1) - 1)
  //     } else {
  //         console.log(`${random} column empty adding new piece`)
  //         newInt = false
  //     }
  // }
  // addPiece(random, 2);
  // return;

  // create array of no adds | columns that are full or and add would result in a loss
  // get random and iterate through array if matches get random again

  // ↓ UNCOMMENT FOR CONSISTENT PIECE PLACEMENT ↓
  let last = 6
  if(board[0][last] > 0){
    last--
  }
  console.log('last slot')
  addPiece(last, 2)
  return
  // }
}
