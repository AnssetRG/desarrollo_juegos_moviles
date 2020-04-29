Wall = function(game,position){
	Phaser.Sprite.call(this,game,position.x,position.y,'wall')
	this.scored = false;
	//this.game.add.existing(this);
}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.reset = function(x,y){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	this.scored = false;
}