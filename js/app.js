
$( document ).ready(function() {
	$('#modal-start').modal('show');
	for(let y = 0; y < 10; y++){
		$('.game-board').append(`<div class='game-column game-column-${y}'></div>`)
		for(let x = 6; x > 0; x--){
			const gameSquare = $('<div/>')
			gameSquare.addClass('square')
			gameSquare.addClass(`square-${y}-${x}`)
			$(`.game-column-${y}`).append(gameSquare)
		}
	}
});


$('.start-game').on('click', () => {

	$('#modal-start').modal('hide');

	// Make an object for the game 
	const game = {
		running: true,
		level: 1,
	}

	// Make an object for the character 

	const tina = {
		x: 4,
		y: 1,
	}


	// Make a function that creates the game board

	

	//make key events for tina

	$('.square-4-1').attr('id', 'tina')
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
			checkCollision();
		}
	}

	const moveRight = () => {
		if (tina.x < 9) {
			const currentSquare = $('#tina');
			$('#tina').removeAttr('id');
			tina.x++;
			$(`.square-${tina.x}-1`).attr('id','tina')
			checkCollision();
		}
	}

	// Make a class for the burgers

	class Burgers {
		constructor(x,y) {
			this.x = x;
			this.y = 7;
			$(`.square-${this.x}-7`).addClass('burgers');
			this.fall();

		}

	// function to make burgers fall

		fall () {
			if(this.y >= 1) {
				$(`.square-${this.x}-${this.y}`).removeClass('burgers');
				this.y--;
				$(`.square-${this.x}-${this.y}`).addClass('burgers');
				checkCollision();
				setTimeout(()=>{
					this.fall();
				}, 500)
			}
		}

	}

	// create random characters 

	// const randomCharacters = [];

	// class Character {
	// 		constructor(x,y) {
	// 			this.x = x;
	// 			this.y = 1;
	// 			$(`.square-${this.x}-1`).addClass('character');

	// 		}

			
	// }

	// const createRandomCharacter = () => {
	//      let x = Math.floor(Math.random() * (18 - 0)) + 0;
	//      const character = new Character (x,1);
	// 	 randomCharacters.push(character);
	// }

	// random burger spawn

	const randomBurgers = [];

	const createRandomBurger =() => {
		let x = Math.floor(Math.random() * (9 - 0)) + 0;
		const burger = new Burgers (x,6);
		console.log(burger);
		randomBurgers.push(burger);
	
	}
	console.log(randomBurgers);

	// make a timer
	let seconds = 0;
	let points = 0;
	const timePassing = () => {
	if (seconds < 60) {
			seconds++;
			$('#time').text(seconds);
			if(seconds % 3 === 0 && seconds < 60 ) {
				createRandomBurger();
			}

			// if (seconds % 5 === 0 && seconds < 60) {
			// 	createRandomCharacter();
			// }

			// detect collision and add points

		}
	
	}
	var passTime = setInterval(timePassing, 1000);


const checkCollision = () => {
		for (let i = 0; i < randomBurgers.length; i ++) {
			if (randomBurgers[i].x === tina.x && randomBurgers[i].y === tina.y) {
				console.log('collision')
				points++;
				$('#points-scored').text(points);
			}
		}
	}

	

})