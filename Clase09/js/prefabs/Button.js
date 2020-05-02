Button = function(game,position,element,index){
	Phaser.Button.call(this,game,position.x,position.y,element.btnAsset,this.clickButton);
	//señales -  mandar eventos a otras pantallas - mensaje global (las pantallas señaladas)
	this.game = game;
	this.index = index;
	this.element = element;
	this.selected = false;
	this.createElement = new Phaser.Signal();
}

//signal es el medio, pero distpach es el mensaje

Button.prototype = Object.create(Phaser.Button.prototype);
Button.prototype.constructor = Button;

Button.prototype.clickButton = function(){
	this.selected = true;
	this.alpha = 0.8;
	//manera de cómo se manda el mensaje
	this.createElement.dispatch(this.element);
}

Button.prototype.unselected = function(index){
	this.selected = false;
	this.alpha = 1;
}