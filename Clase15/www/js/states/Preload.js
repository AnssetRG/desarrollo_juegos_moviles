Preload = function (game) {};

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

    this.load.image("platform", "assets/images/platform.png");
    this.load.image("goal", "assets/images/goal.png");
    this.load.image("slime", "assets/images/slime.png");
    this.load.spritesheet(
      "player",
      "assets/images/player_spritesheet.png",
      29,
      30,
      5
    );
    this.load.spritesheet(
      "fly",
      "assets/images/fly_spritesheet.png",
      35,
      18,
      2
    );
    this.load.image("arrowButton", "assets/images/arrowButton.png");
    this.load.image("actionButton", "assets/images/actionButton.png");
    this.load.image("gameTiles", "assets/images/tiles_spritesheet.png");
    //Ruta,si es otro formato,qué formato va a leer
    this.load.tilemap(
      "level0",
      "assets/levels/demo-level.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
    this.load.tilemap(
      "level1",
      "assets/levels/level1.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
    this.load.tilemap(
      "level2",
      "assets/levels/level2.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );
  },
  create: function () {
    //lo que está en el state pasado se limpia
    //si se pone falso, se queda los datos en memoria
    this.state.start("Game");
  },
};
