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

	    //nomrbre de spritesheet, dirección,ancho, alto, cantidad de fotogramas, desfase en x, desfase en y

	    this.load.image("background","assets/images/background.png");
		this.load.image("chilliButton","assets/images/button_chilli.png");
		this.load.image("plantButton","assets/images/button_plant.png");
		this.load.image("sunflowerButton","assets/images/button_sunflower.png");
		this.load.image("bloodParticle","assets/images/blood.png");
		this.load.image("bullet","assets/images/bullet.png");
		this.load.image("chilli","assets/images/chilli.png");
		this.load.image("sunflower","assets/images/sunflower.png");
		this.load.image("deadZombie","assets/images/dead_zombie.png");
		this.load.spritesheet("chicken","assets/images/chicken_sheet.png",25,25,3);
		this.load.spritesheet("zombie","assets/images/zombie_sheet.png",30,50,3);
		this.load.spritesheet("plant","assets/images/plant_sheet.png",24,40,3);
		this.load.spritesheet("sun","assets/images/sun_sheet.png",30,30,2);

		this.load.text("buttonData","assets/data/buttons.json");
		this.load.text("level1","assets/data/level1.json");
		this.load.text("level2","assets/data/level2.json");

		this.load.audio("hit",["assets/audio/hit.mp3","assets/audio/hit.ogg"])
	},
	create:function(){
		//lo que está en el state pasado se limpia
		//si se pone falso, se queda los datos en memoria
		this.state.start('Game',true,false);
	}
}