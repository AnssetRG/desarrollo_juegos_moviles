window.onload = function () {
  //Agarrar todo el ancho y alto de la pantalla
  var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
  game.state.add("Preload", Preload);
  game.state.add("Game", Game);
  game.state.start("Preload");
};
