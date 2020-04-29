Player = function(game,gravity){
	//archivo que hace referencia, mismo objeto game de states, x, y, key
	//Equivalente a this.game.add.sprite(0,0,'player')
	Phaser.Sprite.call(this,game,0,0,'player');

	this.game = game
	this.gravity = gravity;
	//this.jumpForce = jumpForce;

	this.anchor.setTo(0.5);
	this.x = game.world.centerX;
	this.y = game.world.centerY;
	this.animations.add("fly",[0,1,2],10,true);

	game.physics.arcade.enable(this);
	this.body.gravity.y = this.gravity;
	//this.body.allowGravity = false;

	this.frame = 1;
	//Integración al juego como instancia, hasta antes solo está cargado en memoria
	this.game.add.existing(this);
}



//Igual al prototype de Phazer dando todas sus propiedades
Player.prototype = Object.create(Phaser.Sprite.prototype);

//Inicialziacion del objeto recibe la función Player - sobrescribe el constructor default por este de Player
Player.prototype.constructor = Player;

Player.prototype.flap = function(jumpForce){
	this.body.velocity.y = jumpForce;
}

Player.prototype.update = function(){
	if(this.body.velocity.y > -20){
		this.frame = 3;
	}else{
		this.animations.play("fly");
	}
}