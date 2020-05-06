Plant = function (game, position, element) {
  Phaser.Sprite.call(this, game, position.x, position.y, element.plantAsset);
  this.game = game;
  this.element = element;
  this.anchor.setTo(0.5);
  this.game.physics.arcade.enable(this);
  this.body.inmovable = true;

  this.shootingTime = 1000;
  this.producingTime = 5000;
  this.shootingElapsed = 0;
  this.producingElapsed = 0;
  this.reset(position.x, position.y, element);
  this.createSun = new Phaser.Signal();
};

//signal es el medio, pero distpach es el mensaje

Plant.prototype = Object.create(Phaser.Sprite.prototype);
Plant.prototype.constructor = Plant;

//volver a instanciar el objeto
Plant.prototype.reset = function (x, y, data) {
  //llamar a la función del padre desde el hijo para hacer el comportamiento del padre y darle funcionalidad
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.loadTexture(data.plantAsset);
  this.animationName = null;
  if (data.animationFrame) {
  }
  if (data.hasOwnProperty("animationFrames")) {
    this.animationName = data.plantAsset + "Anim";
    this.animations.add(this.animationName, data.animationFrames, 6, false);
  }
  this.isShooter = false;
  if (data.hasOwnProperty("isShooter")) {
    this.isShooter = data.isShooter;
  }
  this.isSunProducer = false;
  if (data.hasOwnProperty("isSunProducer")) {
    this.isSunProducer = data.isSunProducer;
  }
};

Plant.prototype.shoot = function () {
  if (this.animations.getAnimation(this.animationName)) {
    this.animations.play(this.animationName);
  }
  //TO-DO create bullet
};

Plant.prototype.update = function () {
  this.shootingElapsed += this.game.time.elapsed;
  this.producingElapsed += this.game.time.elapsed;

  if (this.shootingElapsed >= this.shootingTime) {
    this.shootingElapsed = 0;
    this.shoot();
  }
  if (this.producingElapsed >= this.producingTime) {
    this.producingElapsed = 0;
    this.generateSun();
  }
};

Plant.prototype.generateSun = function () {
  if (!this.isSunProducer) return;
  this.createSun.dispatch();
};
