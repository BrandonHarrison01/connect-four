const winCheck = ar => {
    for(let i = 1; i < 4; i++){
        if(ar[0] !== ar[i]){
            return
        }
    }
    console.log(ar[0], 'wins')
}

let ar = [1, 1, 1, 1]

winCheck(ar)
