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

    this.load.image("box", "assets/images/box.png");
    this.load.image("pig", "assets/images/pig.png");
    this.load.image("pole", "assets/images/pole.png");
    this.load.image("chicken", "assets/images/bird.png");
    this.load.image("floor", "assets/images/floor.png");
    this.load.image("concreteBox", "assets/images/concrete-box.png");
    this.load.image("sky", "assets/images/sky.png");
    this.load.text("level1", "assets/data/level1.json");
  },
  create: function () {
    //lo que está en el state pasado se limpia
    //si se pone falso, se queda los datos en memoria
    this.state.start("Game");
  },
};
