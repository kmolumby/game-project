$( document ).ready(function() {
	$('#modal-start').modal('show');

// Make a function that creates the game board
	for(let y = 0; y < 16; y++){
		$('.game-board').append(`<div class='game-column game-column-${y}'></div>`)
		for(let x = 8 ; x > 0; x--){
			const gameSquare = $('<div/>')
			gameSquare.addClass('square')
			gameSquare.addClass(`square-${y}-${x}`)
			$(`.game-column-${y}`).append(gameSquare)
		}
	}
});


$('.start-game').on('click', () => {

	$('#modal-start').modal('hide');
const game = {
	running: true,
	level: 1,
}

// Make an object for the character  


let burgerCollision = false;
const tina = {
	x: 8,
	y: 1,
	points: 0,



 moveLeft () {
		if (this.x > 0) {
			const currentSquare = $('#tina');
			$('#tina').removeAttr('id');
			this.x--;
			$(`.square-${this.x}-1`).attr('id','tina')
			tina.checkCollision();
			// burgers.checkCollision();
		}
	},

	moveRight () {
		if (this.x < 15) {
			const currentSquare = $('#tina');
			$('#tina').removeAttr('id');
			this.x++;
			$(`.square-${this.x}-1`).attr('id','tina')
			tina.checkCollision();
			// burgers.checkCollision();

		}
	},



	checkCollision() {
		const collisionSquare = $(`.square-${this.y}-${this.x}`)
		if($('#tina').hasClass('burgers')) {
				this.points = this.points + 1;
				burgerCollision = true;
				collisionSquare.removeClass('burgers')
				$('#points-scored').text(this.points);
		} else if ($('#tina').hasClass('jimmy')) {
			console.log('collision')
			// $(randomCharacter[i]).remove();


		}
	}, 


	levelUp() {

		if(this.points === 10 && game.level === 1) {
			game.level++
			$('#level').text(game.level);
			burgerRate = 300;
		} else if ( this.points === 20 && game.level === 2) {
			game.level++
			$('#level').text(game.level);
			burgerRate = 100;
		} else if (this.points === 30 && game.level === 3) {
			game.level++
			$('#level').text(game.level);
			burgerRate = 50;
	   }
	}
}





//make a key event 
$('.square-8-1').attr('id', 'tina')
$('body').keydown((event)=>{
    if(event.which == 37){
       tina.moveLeft();
    }else if(event.which == 39){
		tina.moveRight();
		}
	})




// Make a class for the burgers

class Burgers {
	constructor(x,y) {
		this.x = x;
		this.y = 13;
		$(`.square-${this.x}-13`).addClass('burgers');
		this.fall();
		this.remove = false;

	}

// function to make burgers fall

	fall () {
		if(this.y > 0) {
			$(`.square-${this.x}-${this.y}`).removeClass('burgers');
			this.y--;
			$(`.square-${this.x}-${this.y}`).addClass('burgers');
			tina.checkCollision();
			// this.checkCollision();
			setTimeout(()=>{
                this.fall();
			}, burgerRate)
		}
	}

	// checkCollision() {
	// 	const collisionSquare = $(`.square-${this.y}-${this.x}`)
	// 	if($('.burgers').is('tina')) {
	// 		console.log('collision')
	// 			tina.points = tina.points + 1;
	// 			collision = true;
	// 			$('#points-scored').text(tina.points);
	// 	}
	// }

}
let burgerRate = 500;
// 

// random burger spawn

const randomBurgers = [];

const createRandomBurger =() => {
	let x = Math.floor(Math.random() * (18 - 0)) + 0;
	const burger = new Burgers(x,13);
	randomBurgers.push(burger);

}


	// create random characters 

	// const randomCharacters = [];

class Character {
	constructor(x,y,type) {
		this.x = x;
		this.y = 1;
		this.type = type;
		$(`.square-${this.x}-1`).addClass(this.type);
		this.remove = false;
	}

	
}
const randomCharacter =[];
const createRandomJimmy = () => {
	 let x = Math.floor(Math.random() * (18 - 0)) + 0;
	 const jimmy = new Character (x,1,'jimmy');
	 console.log('generating jimmy')
	 
	 randomCharacter.push(jimmy);
}

const createRadomTammy = () => {
	let x = Math.floor(Math.random()*(18-0)) + 0;
	const tammy = new Character (x,1,'tammy');
	randomCharacter.push(tammy);
}
console.log(randomCharacter)
// make a timer

let seconds = 0;
const timePassing = () => {
   if (seconds< 60) {
		seconds++;
		$('#time').text(seconds);
		if(seconds % 3 === 0 && seconds < 60 ) {
			createRandomBurger();
		}

		if(seconds % 8 ===0) {
			createRandomJimmy();
		}


		tina.levelUp();
		}
 
	}

 

var passTime = setInterval(timePassing, 1500);


// detect collision and add points





})
