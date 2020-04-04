window.onload = function(){
	//console.log("NILTON TE IGNORO");

	//primero key del objeto (inamovible), el segundo es el nombre de la función, si va a ser webgl o canvas, el contenedor div
	let game = new Phaser.Game(360,640,Phaser.AUTO,"content",
	{
		preload: loader,
		create: creation,
		update: update
	});

	function loader(){
	}

	function creation(){

		let horizontal = game.world.width / 4;
		let	init = 50;
		let bg = game.add.sprite(0,0,"background");
		let candy = game.add.sprite(0,0,"candy");
		candy.anchor.setTo(0.5);
		candy.y = game.world.height*3/4;
		candy.x = horizontal*0 + init;

		let apple = game.add.sprite(0,0,"apple");
		apple.anchor.setTo(0.5);
		apple.y = game.world.height*3/4;
		apple.x = horizontal*1+ init;

		let rotate = game.add.sprite(0,0,"rotate");
		rotate.anchor.setTo(0.5);
		rotate.y = game.world.height*3/4;
		rotate.x = horizontal*2+ init;

		let rubber_duck = game.add.sprite(0,0,"rubber_duck");
		rubber_duck.anchor.setTo(0.5);
		rubber_duck.y = game.world.height*3/4;
		rubber_duck.x = horizontal*3+ init;

		let pet = game.add.sprite(0,0,"pet");
		pet.anchor.setTo(0.5);
		pet.y = game.world.height*2/4;
		pet.x = horizontal*2+ init;

	}

	function update(){
	}
}