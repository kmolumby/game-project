// Make a class for the burgers

// class Burgers {
// 	constructor(x,y) {
// 		this.x = 9;
// 		this.y = 13;
// 	}

// 	fall () {
// 		if(this.y > 0) {
// 			$(`.square-${this.x}-${this.y}`).removeClass('burgers');
// 			this.y++;
// 			$(`.square-${this.x}-${this.y}`).addClass('burgers');
// 			setTimeout(()=>{
//                 this.fall();
//             }, 100)
// 		}
// 	}

// }


// Make an object for the character  

const tina = {
	x: 8,
	y: 1,
}

// class Character {
    
// }

// Make a function that creates the game board

for(let y = 0; y < 20; y++){
    $('.game-board').append(`<div class='game-column game-column-${y}'></div>`)
    for(let x = 13; x > 0; x--){
        const gameSquare = $('<div/>')
        gameSquare.addClass('square')
        gameSquare.addClass(`square-${y}-${x}`)
        $(`.game-column-${y}`).append(gameSquare)
    }
}

//make a key event 
$('.square-8-1').attr('id', 'tina')
$('body').keydown((event)=>{
    if(event.which == 37){
        moveLeft();
    }else if(event.which == 39){
		moveRight();
		}
	})

const moveLeft = () => {
	if (tina.x > 0) {
		const currentSquare = $('#tina');
		$('#tina').removeAttr('id');
		tina.x--;
		$(`.square-${tina.x}-1`).attr('id','tina')
	}
}

const moveRight = () => {
	if (tina.x < 19) {
		const currentSquare = $('#tina');
		$('#tina').removeAttr('id');
		tina.x++;
		$(`.square-${tina.x}-1`).attr('id','tina')
	}
}

// make a timer

let seconds = 0;

const timePassing = () => {
   if (seconds< 30) {
	seconds++;
	$('#time').text(seconds)
 }
}
var passTime = setInterval(timePassing, 1500);
// random burger spawn

// function to make burgers fall

// function to add points to scoreboard

