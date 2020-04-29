Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	create:function(){
		this.gravity = 500;
		this.jumpForce = -400;

		//habilitar físicas
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//tileSprite (iniX,iniY,finX,finY,asset)
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,"background");

		//autoScroll (velocidadX, velocidadY)
		this.background.autoScroll(-100,0);

		this.player = new Player(this.game,this.gravity);



		
		this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceBar.onDown.add(this.flap,this);
		this.game.input.onDown.add(this.flap,this);

		this.walls = this.game.add.group();
		this.spawnWall = 0;
		this.score = 0;

		this.scoreText = this.game.add.text(0,0,'Score :'+this.score);
		this.scoreText.fill = "#FFFFFF";

		this.maxScore = this.game.add.text(0,0,'Max Score');
		this.maxScore.x = this.game.width - 200;
		this.maxScore.fill = "#FFFFFF";

		this.gameOverText = this.game.add.text(0,0,'Game Over');
		this.gameOverText.x = this.game.world.centerX;
		this.gameOverText.y = this.game.world.centerY;
		console.log(this.gameOverText.x ,this.gameOverText.y);
		this.gameOverText.anchor.setTo(0.5);
		this.gameOverText.inputEnabled = true;
		this.gameOverText.visible = false;
		this.gameOverText.events.onInputDown.add(this.restartGame,this);

		if(localStorage.points != null){
			this.maxScore.text = 'Max Score: ' + parseInt(localStorage.points);
		}
	},
	restartGame:function(){
		this.state.start("Game");
	},
	flap:function(){
		this.player.flap(this.jumpForce);
	},
	createWall:function(){
		//integerInRange: random entre 2 valores 
		let wallY = this.game.rnd.integerInRange(this.game.height*0.3,this.game.height*0.7);
		this.generateWall(wallY);
		this.generateWall(wallY,true);
	},
	generateWall:function(wallY,flipped){
		let posY;
		let opening = 400;
		if(flipped){
			wallY = wallY - (opening/2);
		}else{
			wallY = wallY + (opening/2);
		}
		let wall = this.walls.getFirstDead();
		if(wall){
			wall.reset(this.game.width, wallY);
		}else{
			wall = new Wall(this.game,{x:this.game.width,y:wallY});
		}
		this.game.physics.arcade.enable(wall);
		wall.body.velocity.x = -200;
		wall.body.inmovable = true;
		wall.body.allowGravity = false;
		this.walls.add(wall);
		if(flipped){
			wall.scale.y = -1;
		}else{
			wall.scale.y = 1;
		}
	},
	update:function(){
		this.spawnWall += this.game.time.elapsed;
		if(this.spawnWall >3000){
			this.spawnWall = 0;
			this.createWall();
		}

		this.game.physics.arcade.overlap(this.player,this.walls,null,this.killPlayer,this);
		this.walls.forEachAlive(function(wall){
			if(wall.x < -wall.width){
				wall.kill();
			}else{
				if(!wall.scored){
					if(this.player.x >= wall.x){
						wall.scored = true;
						this.score += 0.5;
						this.scoreText.text = 'Score :'+this.score;
						
					}
				}
			}
		},this)
	},
	killPlayer:function(){
		this.player.kill();
		this.walls.callAll("kill");
		
		if(localStorage.points != null){
			let temp = localStorage.points;
			if(temp < this.score){
				localStorage.points = parseInt(this.score);
			}
		}else{
			//localStorage.setItem("points",this.points);
			localStorage.points = parseInt(this.score);
		}

		this.gameOverText.visible = true;
	}
}