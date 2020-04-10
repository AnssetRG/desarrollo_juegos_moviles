Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	create:function(){
		// cache: diccionario
		this.levelData = JSON.parse(this.cache.getText("level"));

		this.platforms = this.game.add.group();
		this.levelData.platformData.forEach(this.createPlatform,this);

		this.fires = this.game.add.group();
		this.levelData.fireData.forEach(this.createFire,this);

		this.character = this.game.add.sprite(this.levelData.playerStart.x + 50,this.levelData.playerStart.y,'player_spritesheet')
		this.character.anchor.setTo(0.5);
		this.character.scale.setTo(-1,1);

		this.fires.forEach(this.createAnimation,this)
		//this.dummy = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'fire_spritesheet')
		//this.dummy.animations.add('firing',[0,1],4,true);
		//this.dummy.animations.play('firing');
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
		
		fire.animations.add("firing",[0,1],4,true);

		fire.animations.play("firing");

		this.platforms.add(fire);
	},
	createAnimation:function(element){
		//element.animations.add("firing",[1,2,1],2,true);
		//element.animations.play("firing");
	}
}