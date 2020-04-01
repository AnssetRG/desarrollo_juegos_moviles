
window.onload = function(){
	//console.log("NILTON TE IGNORO");

	let game = new Phaser.Game(640,360,Phaser.AUTO,"content",
	{
		preload: loader,
		create: creation,
		update: update
	});

	function loader(){
		//console.log("preload");
		game.load.image("background","assets/images/background.png");
		game.load.image("arrow","assets/images/arrow.png")
	}

	function creation(){
		//console.log("create");
		//(x,y, nombre de la imagen)
		let bg = game.add.sprite(0,0,"background");
		let arrow_left = game.add.sprite(0,0,"arrow");
		arrow_left.anchor.setTo(0.5,0.5);
		arrow_left.y = game.world.centerY;
		arrow_left.x = arrow_left.width*0.5;
		arrow_left.scale.setTo(-1);

		let arrow_right = game.add.sprite(0,0,'arrow');
		arrow_right.anchor.setTo(0.5);
		arrow_right.y = game.world.centerY;

		arrow_right.x = game.width - (arrow_right.width*0.5);

		//arrow_left.angle += 180;
		//arrow_left.anchor.setTo(180,360/2-35);
		//let arrow_right = game.add.sprite(520,180 - 35,"arrow")

	}

	function update(){
		//console.log("update")		;
	}
}