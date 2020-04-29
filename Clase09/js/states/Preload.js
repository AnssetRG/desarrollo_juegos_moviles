Preload = function(game){}

//prototype: para crear más funcionalidades
Preload.prototype = {
	preload : function(){
		//escalar la pantalla de acuerdo a los recursos, NONE es por defecto
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//centrar el juego horizontalmente
	    this.scale.pageAlignHorizontally = true;
	    //centrar el juego verticalmente
	    this.scale.pageAlignVertically = true;

	    this.load.image("background","assets/images/background-texture.png");
	    this.load.image("wall","assets/images/wall.png");
	    //nomrbre de spritesheet, dirección,ancho, alto, cantidad de fotogramas, desfase en x, desfase en y
	    this.load.spritesheet("player","assets/images/player.png",48,48,4);
	},
	create:function(){
		this.state.start('Game');
	}
}