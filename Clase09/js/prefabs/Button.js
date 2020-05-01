Button = function(game,position,element,button_function,){
	Phaser.Button.call(this,game,position.x,position.y,element,button_function,this);
	//this.buttonData = element,
}


Button.prototype = Object.create(Phaser.Button.prototype);
Button.prototype.constructor = Button;

//button = new Phaser.Button(this.game,80+index*40,this.game.height-35,element.btnAsset,this.clickButton,this);
//button.buttonData = element;