$( document ).ready(function() {
	$('#modal-start').modal('show');

// Make a function that creates the game board
	for(let y = 0; y < 22; y++){
		$('.game-board').append(`<div class='game-column game-column-${y}'></div>`)
		for(let x =13 ; x > 0; x--){
			const gameSquare = $('<div/>')
			gameSquare.addClass('square')
			gameSquare.addClass(`square-${y}-${x}`)
			$(`.game-column-${y}`).append(gameSquare)
		}
	}
});


$('.start-game').on('click', () => {

	$('#modal-start').modal('hide');
// Make an object for the character  
const game = {
	running: true,
	level: 1,
}
const tina = {
	x: 8,
	y: 1,
	points: 0,
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

// Make a class for the burgers

class Burgers {
	constructor(x,y) {
		this.x = x;
		this.y = 13;
		$(`.square-${this.x}-13`).addClass('burgers');
		this.fall();

	}

// function to make burgers fall

	fall () {
		if(this.y > 0) {
			$(`.square-${this.x}-${this.y}`).removeClass('burgers');
			this.y--;
			$(`.square-${this.x}-${this.y}`).addClass('burgers');
			setTimeout(()=>{
                this.fall();
			}, 500)
			checkCollision();

		}
	}

}

// 

// random burger spawn

const randomBurgers = [];

const createRandomBurger =() => {
	let x = Math.floor(Math.random() * (18 - 0)) + 0;
	const burger = new Burgers(x,13);
	randomBurgers.push(burger);

}
// make a timer

let seconds = 0;
let points = 0;
const timePassing = () => {
   if (seconds< 30) {
		seconds++;
		$('#time').text(seconds);
		if(seconds % 3 === 0 && seconds < 30 ) {
			createRandomBurger();
		}


		}
 
	}


var passTime = setInterval(timePassing, 1500);


// detect collision and add points

const checkCollision = () => {
	for (let i = 0; i < randomBurgers.length; i ++) {
		if (randomBurgers[i].x === tina.x && randomBurgers[i].y === tina.y) {
			console.log('collision')
			tina.points++;
			$('#points-scored').text(tina.points);
		}
	}
}



})
