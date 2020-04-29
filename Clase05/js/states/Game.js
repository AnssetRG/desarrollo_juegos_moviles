Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	create:function(){
		//habilitar físicas
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//gravedad de 1000 píxeles/s
		this.physics.arcade.gravity.y = 1000;


		// cache: diccionario
		this.levelData = JSON.parse(this.cache.getText("level"));

		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		this.levelData.platformData.forEach(this.createPlatform,this);
		//setAll: for por todos los elementos y seteas un parámetro string ccn un valor
		this.platforms.setAll("body.allowGravity",false);
		this.platforms.setAll("body.immovable",true);

		this.fires = this.add.group();
		this.fires.enableBody = true;
		this.levelData.fireData.forEach(this.createFire,this);
		this.fires.setAll("body.allowGravity",false);
		this.fires.setAll("body.immovable",true);


		this.character = this.game.add.sprite(this.levelData.playerStart.x,this.levelData.playerStart.y,'player_spritesheet')
		this.character.anchor.setTo(0.5);
		this.character.scale.setTo(-1,1);
		this.physics.arcade.enable(this.character)
		this.character.body.collideWorldBounds = true;
		this.character.animations.add('walking',[0,1,2,1],3,true);

		this.keys = this.input.keyboard.	();

		this.ground = this.add.sprite(0,0,'ground');
		this.ground.y = this.game.height - this.ground.height;
		this.physics.arcade.enable(this.ground)
		this.ground.body.collideWorldBounds = true;
		this.ground.body.immovable = true;

		this.barrils = this.game.add.group();
		this.barrils.enableBody = true;
		this.barrelFrequency = this.levelData.barrelFrequency * 1000;
		this.barrelSpeed = this.levelData.barrelSpeed;
		this.platforms.setAll("body.allowGravity",false);
		this.platforms.setAll("body.immovable",true);
		this.elapsedTime = 0;

		this.createButtons();

		this.playerActions = {left:false, right:false, up:false}
	},
	createPlatform:function(element){
		//primera forma - SSJ1
		//let platform = this.game.add.sprite(element.x,element.y,'platform');
		//this.platforms.add(platform);

		//segunda forma - SSJ2
		//this.platforms.create(element.x,element.y,'platform');

		//tercera forma - SSJ3
		let platform = new Phaser.Sprite(this,element.x,element.y,'platform');
		this.platforms.add(platform);
	},
	createFire:function(element){
		//this.fires.create(element.x,element.y,'fire_spritesheet');
		
		let fire = this.game.add.sprite(element.x,element.y,'fire_spritesheet');
		
		fire.animations.add("firing",[0,1],8,true);
		fire.animations.play("firing");

		this.fires.add(fire);
	},
	createBarrel:function(){
		let barrel = this.barrils.getFirstDead();
		if(!barrel){
			barrel = this.game.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'barrel');
			this.barrils.add(barrel);
		}else{
			barrel.reset(this.levelData.goal.x,this.levelData.goal.y);
		}
		barrel.body.velocity.x = 200;
		barrel.body.collideWorldBounds = true;
		barrel.body.bounce.setTo(1,0.5);
	},
	createButtons:function(){
		this.leftButton = this.game.add.sprite(0,0,'arrowButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.direction = "left";
		this.leftButton.y = this.game.height - this.leftButton.height;
		this.leftButton.events.onInputDown.add(this.pressButton,this);
		this.leftButton.events.onInputUp.add(this.realeseButton,this);

		this.rightButton = this.game.add.sprite(this.leftButton.width+10,0,'arrowButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.direction = "right";
		this.rightButton.y = this.game.height - this.rightButton.height;
		this.rightButton.events.onInputDown.add(this.pressButton,this);
		this.rightButton.events.onInputUp.add(this.realeseButton,this);

		this.actionButton = this.game.add.sprite(0,0,'actionButton');
		this.actionButton.inputEnabled = true;
		this.actionButton.direction = "up";
		this.actionButton.x = this.game.width - this.actionButton.width;
		this.actionButton.y = this.game.height - this.actionButton.height;
		this.actionButton.events.onInputDown.add(this.pressButton,this);
		this.actionButton.events.onInputUp.add(this.realeseButton,this);
	},
	pressButton:function(sprite){
		switch(sprite.direction){
			case "left":
				this.playerActions.left = true;
				break;
			case "right":
				this.playerActions.right = true;
				break;
			case "up":
				this.playerActions.up = true;
				break;
		}
	},
	realeseButton:function(sprite){
		switch(sprite.direction){
			case "left":
				this.playerActions.left = false;
				break;
			case "right":
				this.playerActions.right = false;
				break;
			case "up":
				this.playerActions.up = false;
				break;
		}
	},
	update:function(){
		if(!this.character.alive){
			this.state.start('Game');
		}
		this.elapsedTime += this.time.elapsed;
		if(this.elapsedTime >= this.barrelFrequency){
			this.elapsedTime = 0;
			this.createBarrel();
			console.log("Reset")
		}

		this.barrils.forEachAlive(function(element){
			if(element.y >= 600){
				element.kill();
			}
		})

		//colisiones: objeto,objeto | objeto,grupo | grupo,grupo
		this.physics.arcade.collide(this.character,this.ground);
		this.physics.arcade.collide(this.character,this.platforms);
		this.physics.arcade.collide(this.barrils,this.platforms);

		//overlap(objeto1,objeto2,antes que se ejecute la función de colisión,función ejecutada una vez hecha la colisón,no aislar)
		this.physics.arcade.overlap(this.character,this.barrils,null,this.checkCollision,this);
		if(this.keys.left.isDown || this.playerActions.left){
			this.character.body.velocity.x += -10;
			this.character.animations.play('walking');
			this.character.scale.setTo(1);
		}else if(this.keys.right.isDown || this.playerActions.right){
			this.character.body.velocity.x += 10;
			this.character.animations.play('walking');
			this.character.scale.setTo(-1,1);
		}else{
			this.character.frame = 3;
			this.character.body.velocity.x = 0;
		}
		if((this.keys.up.isDown || this.playerActions.up)&& this.character.body.touching.down ){
			this.character.body.velocity.y = -750;
		}
	},
	//devuelve los 2 elementos de la colisión
	checkCollision:function(sprite1,sprite2){
		sprite1.kill();
		sprite2.kill();
		this.barrils.callAll('kill');
	}
}