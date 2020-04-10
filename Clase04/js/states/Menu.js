Menu = function(game){}
Menu.prototype ={
	create:function(){
		let background = this.add.sprite(0,0,"background");

		let title = this.add.text(0,0,"AAAAHHHHH",{
			font: "40px Arial",
			fill: "#FFFFFF"
		});

		title.anchor.setTo(0.5);
		title.x = this.world.centerX;
		title.y = this.world.centerY;

		title.inputEnabled = true;
		title.events.onInputDown.add(this.goGame,this);
	},
	//función separada de las funciones de las de Phaser, por eso el "this" es diferente, entornos apartes
	//por ello se pasa "this" como parámetro
	goGame:function(){
		//console.log("go game");
		this.state.start("Game");
	}
}