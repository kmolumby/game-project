// Make a class for the burgers

// class Burgers {

// }


// Make a class for the character 

// class Character {
    
// }

// Make a function that creates the game board

for(let y = 1; y < 11; y++){
    $('.game-board').append(`<div class='game-column game-column-${y}'></div>`)
    for(let x = 10; x > 0; x--){
        const gameSquare = $('<div/>')
        gameSquare.addClass('square')
        gameSquare.addClass(`square-${y}-${x}`)
        $(`.game-column-${y}`).append(gameSquare)
    }
}