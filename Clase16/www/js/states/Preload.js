Preload = function () {};

//prototype: para crear más funcionalidades
Preload.prototype = {
  preload: function () {
    //escalar la pantalla de acuerdo a los recursos, NONE es por defecto
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //centrar el juego horizontalmente
    this.scale.pageAlignHorizontally = true;
    //centrar el juego verticalmente
    this.scale.pageAlignVertically = true;

    //nomrbre de spritesheet, dirección,ancho, alto, cantidad de fotogramas, desfase en x, desfase en y

    this.load.image("bullet", "assets/images/bullet.png");
    this.load.image("space", "assets/images/space.png");
    this.load.image("enemyParticle", "assets/images/enemyParticle.png");
    this.load.image("player", "assets/images/player.png");
    this.load.spritesheet("redEnemy", "assets/images/red_enemy.png", 50, 46, 3);
    this.load.spritesheet(
      "greenEnemy",
      "assets/images/green_enemy.png",
      50,
      46,
      3
    );
    this.load.spritesheet(
      "yellowEnemy",
      "assets/images/yellow_enemy.png",
      50,
      46,
      3
    );
    //Ruta,si es otro formato,qué formato va a leer
    this.load.text("level1", "assets/data/level1.json");
    this.load.text("level2", "assets/data/level2.json");
    this.load.text("level3", "assets/data/level3.json");
    this.load.audio("orchestra", [
      "assets/audio/8bit-orchestra.ogg",
      "assets/audio/8bit-orchestra.mp3",
    ]);
  },
  create: function () {
    //lo que está en el state pasado se limpia
    //si se pone falso, se queda los datos en memoria
    this.state.start("Game");
  },
};
