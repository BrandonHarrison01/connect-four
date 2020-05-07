//future dynamically populate the game board update
//fix this bug and it will be totally lit 🔥

let blah = [ [ 0 ] ]

console.log(blah, 'pre loop')

//populating nested arrays using for loop wont let me set a value at a specific index, populating entire column
for(let i = 1; i < 6; i++){
    blah[0].push(0)
    blah.push(blah[0])
}

console.log(blah, 'post loop')

blah[3][2] = 1

console.table(blah)