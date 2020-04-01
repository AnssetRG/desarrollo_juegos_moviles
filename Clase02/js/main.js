
window.onload = function(){
	//console.log("NILTON TE IGNORO");

	//primero key del objeto (inamovible), el segundo es el nombre de la función, si va a ser webgl o canvas, el contenedor div
	let game = new Phaser.Game(640,360,Phaser.AUTO,"content",
	{
		preload: loader,
		create: creation,
		update: update
	});

	let index = 0,
		current_animal = {},
		animals = ["sheep","horse","pig","chicken"],
		new_animal = {},
		isMoving = false;

	function loader(){
		//console.log("preload");
		game.load.image("background","assets/images/background.png");
		game.load.image("arrow","assets/images/arrow.png");

		game.load.spritesheet("sheep","assets/images/sheep_spritesheet.png",244,200,3);
		game.load.spritesheet("chicken","assets/images/chicken_spritesheet.png",131,200,3);
		game.load.spritesheet("horse","assets/images/horse_spritesheet.png",212,200,3);
		game.load.spritesheet("pig","assets/images/pig_spritesheet.png",297,200,3);
	}

	function creation(){
		//console.log("create");
		//(x,y, nombre de la imagen)
		let bg = game.add.sprite(0,0,"background");
		let arrow_left = game.add.sprite(0,0,"arrow");
		arrow_left.anchor.setTo(0.5);
		arrow_left.direction = "left";
		arrow_left.y = game.world.centerY;
		arrow_left.x = arrow_left.width*0.5;
		arrow_left.scale.setTo(-1);

		arrow_left.inputEnabled = true;
		arrow_left.events.onInputDown.add(clickArrow);



		let arrow_right = game.add.sprite(0,0,'arrow');
		arrow_right.direction = "right";
		arrow_right.anchor.setTo(0.5);
		arrow_right.y = game.world.centerY;

		arrow_right.x = game.width - (arrow_right.width*0.5);

		arrow_right.inputEnabled = true;
		arrow_right.events.onInputDown.add(clickArrow);

		index = game.rnd.integerInRange(0,animals.length - 1);

		current_animal = game.add.sprite(0,0,animals[index]);
		current_animal.anchor.setTo(0.5);
		current_animal.x = game.world.centerX;
		current_animal.y = game.world.centerY;

		//nombre,secuencia, frames por segundo, loop
		current_animal.animations.add('animate',[0,1,2,1,0,1],3,true)
		current_animal.animations.play('animate');


	}

	function update(){
		//console.log("update");
		//current_animal.loadTexture(animals[index]);
	}

	function clickArrow(sprite){
		if(isMoving) return;
		isMoving = true;
		if(sprite.direction == "left"){
			index = index == 0 ? animals.length - 1 : index - 1;
			new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
			new_animal.anchor.setTo(0.5);
			new_animal.x = game.width + new_animal.width;

			let tween_flecha = game.add.tween(sprite).to({alpha: 0.5},300);
			tween_flecha.start();
			let tween_current = game.add.tween(current_animal).to({x: -current_animal.width},300);
			tween_current.start();
			let tween_new = game.add.tween(new_animal).to({x: game.world.centerX},300);
			tween_new.start();
			tween_new.onComplete.add(onCompleteTween);
			tween_flecha.onComplete.add(onCompleteTweenFlecha);


			//current_animal.x -= 10;
			//if(index < animals.length-1) index++;

			//tween = movimiento por interpolacion ({criterio de movimiento x o y}, ms que demora)
			//let tween = game.add.tween(current_animal).to({x:current_animal.x - 40},200);
			//tween.start();
		}else if(sprite.direction == "right"){
			index = index == animals.length - 1? 0 : index + 1;
			new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
			new_animal.anchor.setTo(0.5);
			new_animal.x = -new_animal.width;

			let tween_flecha = game.add.tween(sprite).to({alpha: 0.5},300);
			tween_flecha.start();
			let tween_current = game.add.tween(current_animal).to({x: game.world.width +current_animal.width},300);
			tween_current.start();
			let tween_new = game.add.tween(new_animal).to({x: game.world.centerX},300);
			tween_new.start();
			tween_new.onComplete.add(onCompleteTween);
			tween_flecha.onComplete.add(onCompleteTweenFlecha);

			//current_animal.x += 10;
			//if(index > 0) index--;

			//let tween = game.add.tween(current_animal).to({x:current_animal.x + 40},200);
			//tween.start();
		}

		function onCompleteTween(sprite){
			//destroy -> nula  --- kill -> lo desactiva de escena y no lo considera en las siguientes escenas
			current_animal.destroy();
			current_animal = new_animal;
			isMoving = false;
			

		}

		function onCompleteTweenFlecha(sprite){
			//sprite.alpha = 1.0;
			let tween_recuperar = game.add.tween(sprite).to({alpha: 1},300);
			tween_recuperar.start();
		}
	}
}