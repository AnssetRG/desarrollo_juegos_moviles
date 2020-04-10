Preload = function(game){}

//prototype: para crear más funcionalidades
Preload.prototype = {
	preload : function(){
		//escalar la pantalla de acuerdo a los recursos NONE es por defecto
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//centrar el juego horizontalmente
	    this.scale.pageAlignHorizontally = true;
	    //centrar el juego verticalmente
	    this.scale.pageAlignVertically = true;
		
		this.load.image("actionButton","assets/images/actionButton.png");
		this.load.image("arrowButton","assets/images/arrowButton.png");
		this.load.image("barrel","assets/images/actionButton.png");
		this.load.image("gorilla3","assets/images/gorilla3.png");
		this.load.image("ground","assets/images/ground.png");
		this.load.image("platform","assets/images/platform.png");
		//nomrbre de spritesheet, dirección,ancho, alto, cantidad de fotogramas, desfase en x, desfase en y
		this.load.spritesheet("fire_spritesheet","assets/images/fire_spritesheet.png",20,21,2,1,1);
		this.load.spritesheet("player_spritesheet","assets/images/player_spritesheet.png",28,30,5,1,1);
		//cargar archivos de texto
		this.load.text("level","assets/data/level.json");

	},
	create:function(){
		this.state.start('Game');
	}
}