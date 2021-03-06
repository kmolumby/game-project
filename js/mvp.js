


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

	const playTheme = () => {
		$('#theme')[0].play();
		}
	
		playTheme();
	

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
	position: $(`.square-${this.x}-${this.y}`),



	moveLeft () {
			if (this.x > 0) {
				$('#tina').removeAttr('id');
				this.x--;
				$(`.square-${this.x}-1`).attr('id','tina')
				tina.checkCollision();
			}
		},

		moveRight () {
			if (this.x < 15) {
				$('#tina').removeAttr('id');
				this.x++;
				$(`.square-${this.x}-1`).attr('id','tina')

			}
		},

		jumpUp () {
			if (this.y == 1) {
				$('#tina').removeAttr('id');
				this.y++;
				$(`.square-${this.x}-${this.y}`).attr('id','tina')
				setTimeout(()=>{
					this.jumpDown();
				}, 600)
			}
		},
		jumpDown() {
			if (this.y == 2) {
				$('#tina').removeAttr('id');
				this.y--;
				$(`.square-${this.x}-${this.y}`).attr('id','tina')
				tina.checkCollision();	
			}
		},



		checkCollision() {
			if($('#tina').hasClass('burgers')) {
				$('#tina').removeClass('burgers');
				this.points = this.points + 1;
				$('#points-scored').text(this.points);
			} else if ($('#tina').hasClass('jimmy')) {
				console.log('collision')
				$('#tina').removeClass('jimmy');
				$(".sounds")[0].play();
				this.points = this.points + 2;
				$('#points-scored').text(this.points);
				thereIsNoJimmy = true;
			} else if ($('#tina').hasClass('frond')) {
				$('#tina').removeClass('frond');
				$("#panic")[0].play();
				this.points = this.points - 2;
				thereIsNoFrond = true;
				$('#points-scored').text(this.points);
			}
		}, 


		levelUp() {

			if(this.points >= 10 && game.level === 1) {
				game.level++
				$('#level').text(game.level);
				burgerRate = 300;
			} else if ( this.points >= 20 && game.level === 2) {
				game.level++
				$('#level').text(game.level);
				burgerRate = 150;
			} else if (this.points >= 30 && game.level === 3) {
				game.level++
				$('#level').text(game.level);
				burgerRate = 120;
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
		} else if (event.which == 38) {
			tina.jumpUp();
		}
		})




	// Make a class for the burgers

	class Burgers {
		constructor(x,y) {
			this.x = x;
			this.y = 13;
			$(`.square-${this.x}-13`).addClass('burgers');
			this.fall();
			this.removed = false;

		}

	// function to make burgers fall

		fall () {
			if(this.y > 0) {
				$(`.square-${this.x}-${this.y}`).removeClass('burgers');
				this.y--;
				$(`.square-${this.x}-${this.y}`).addClass('burgers');
				tina.checkCollision();
				setTimeout(()=>{
					this.fall();
				}, burgerRate)
			}
		}
		
	}

	let burgerRate = 500;
	// random burger spawn

	const randomBurgers = [];

	const createRandomBurger =() => {
		let x = Math.floor(Math.random() * (18 - 0)) + 0;
		const burger = new Burgers(x,13);
		randomBurgers.push(burger);

	}


		// create random characters 

	class Character {
		constructor(x,y,type) {
			this.x = x;
			this.y = 1;
			this.type = type;
			$(`.square-${this.x}-1`).addClass(this.type);
			this.removed = false;
			this.position = $(`.square-${this.x}-${this.y}`)
		}

			move() {
				if(!this.removed){
					$(`.square-${this.x}-${this.y}`).removeClass(this.type);
					this.x++;
					$(`.square-${this.x}-${this.y}`).addClass(this.type);
					tina.checkCollision();
					setTimeout(()=>{
						this.move();
					}, 400)	
				}
				if (this.x === 15) {
					thereIsNoFrond = true;
				}
			}		
	}

	const randomCharacter =[];
	let thereIsNoJimmy = true;
	let thereIsNoFrond = true;
	const createRandomJimmy = () => {
		thereIsNoJimmy = false
		let x = Math.floor(Math.random() * (18 - 0)) + 0;
		const jimmy = new Character(x,1,'jimmy');
		randomCharacter.push(jimmy);
	}

	const createFrond = () => {
		thereIsNoFrond = false;
		let x = 0;
		const frond = new Character (x,1,'frond');
		randomCharacter.push(frond);
		frond.move();
	}
	// make a timer
	let seconds = 0;
	const timePassing = () => {
		if (seconds< 60) {
				seconds++;
				$('#time').text(seconds);
				if(seconds % 2 === 0 && seconds < 60 ) {
					createRandomBurger();
				}

				if(seconds % 11 === 0 && thereIsNoJimmy) {
					createRandomJimmy();
				}

				if(seconds % 13 === 0 && thereIsNoFrond) {
					createFrond();
				}

				tina.levelUp();
			}
		}

	var passTime = setInterval(timePassing, 1500);

})
