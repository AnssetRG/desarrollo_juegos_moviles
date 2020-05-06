Game = function (game) {};

//prototype: para crear más funcionalidades
Game.prototype = {
  //metodo que se ejecuta antes del create para los parámtros entre states
  init: function (currentLevel, msg, show) {
    this.currentLevel = currentLevel ? currentLevel : 1;
    this.houseX = 60;
    this.sun_frecuency = 5;
    this.sun_velocity = 50;
    this.zombie_y_positions = [49, 99, 149, 199, 249];
  },
  create: function () {
    this.numSums = 1000;

    this.background = this.game.add.sprite(0, 0, "background");
    this.createLand();
    this.crateGUI();
    this.bullets = this.game.add.group();
    this.plants = this.game.add.group();
    this.zombies = this.game.add.group();
    this.suns = this.game.add.group();

    this.hitSounds = this.game.add.audio("hit");
    this.loadLevel();
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.sunElapsed = 0;
    this.totalSunElapsed = this.sun_frecuency * 1000;
  },
  loadLevel: function () {
    this.levelName = "level" + this.currentLevel;
    this.levelData = JSON.parse(this.game.cache.getText(this.levelName));
    this.zombieElapsed = 0;
    this.currentZombie = 0;

    this.zombieData = this.levelData.zombies;
    this.totalZombie = this.zombieData.length - 1;
    this.zombieTotalTime = this.zombieData[this.currentZombie].time * 1000;
  },
  createLand: function () {
    this.patches = this.game.add.group();
    //crear en memoria algo con esas dimensiones
    var rectangle = this.game.add.bitmapData(40, 50);
    //ctx: contexto
    rectangle.ctx.fillStyle = "#000";
    rectangle.ctx.fillRect(0, 0, 40, 50);

    let j, patch, alpha;
    let dark = false;

    for (let i = 0; i < 10; i++) {
      for (j = 0; j < 5; j++) {
        patch = new Patch(
          this.game,
          { x: 64 + i * 40, y: 24 + j * 50 },
          rectangle
        );
        dark = patch.SetAlhpa(dark);
        this.patches.add(patch);
        patch.createPlant.add(this.putPlant, this);
      }
    }
  },
  putPlant: function (x, y, sprite) {
    if (this.currentSelection && this.currentSelection.cost <= this.numSums) {
      sprite.busy = true;
      let plant = new Plant(this.game, { x: x, y: y }, this.currentSelection);
      //las plantas deben ser con pool de objetos
      this.plants.add(plant);
      plant.createSun.add(this.generateSun, this);
      this.numSums -= this.currentSelection.cost;
      this.clearSelection();
      this.updateStats();
    }
  },
  crateGUI: function () {
    let sun = this.game.add.sprite(10, this.game.height - 20, "sun");
    sun.anchor.setTo(0.5);
    sun.scale.setTo(0.5);
    let style = { font: "14px Arial", fill: "#fff" };
    this.sunLabel = this.game.add.text(22, this.game.height - 28, "", style);
    this.updateStats();
    this.buttonData = JSON.parse(this.game.cache.getText("buttonData"));
    this.buttons = this.game.add.group();
    let button;
    this.buttonData.forEach(function (element, index) {
      button = new Button(
        this.game,
        { x: 80 + index * 40, y: this.game.height - 35 },
        element,
        index
      );
      button.createElement.add(this.showElement, this);
      this.buttons.add(button);
    }, this);
  },
  showElement: function (element) {
    this.currentSelection = element;
  },
  clearSelection: function () {
    this.currentSelection = null;
    this.buttons.forEach(function (element, index) {
      element.unselected();
    }, this);
  },
  updateStats: function () {
    this.sunLabel.text = this.numSums;
  },
  update: function () {
    this.sunElapsed += this.game.time.elapsed;
    if (this.sunElapsed >= this.totalSunElapsed) {
      this.sunElapsed = 0;
      this.generateSun();
    }
    this.zombieElapsed += this.game.time.elapsed;
    /*if (this.zombieElapsed >= this.zombieTotalTime) {
      if (this.currentZombie < this.totalZombie) {
        this.generateZombie(this.zombieData[this.currentZombie]);
        this.currentZombie++;
        if (this.totalZombie <= this.currentZombie) {
          this.currentZombie = 0;
          this.zombieElapsed = 0;
        }
        this.zombieTotalTime = this.zombieData[this.currentZombie].time * 1000;
      }
    }*/
    this.zombies.forEachAlive(function (zombie) {
      if (zombie.x < 50) {
        zombie.kill();
      }
    });
  },
  generateZombie: function (element) {
    //GENERAR zombies con pool de objetos y utilizar el array de posiciones de zombies this.zombie_y_positions
    let posY = this.game.rnd.integerInRange(0, this.zombie_y_positions.length);
    let zombie = this.zombies.getFirstDead();
    if (zombie) {
      console.log("Restarting Zombie");
      zombie.reset(
        this.game.width - 50,
        this.zombie_y_positions[posY],
        element
      );
    } else {
      zombie = new Zombie(
        this.game,
        { x: this.game.width - 50, y: this.zombie_y_positions[posY] },
        element
      );
    }

    this.zombies.add(zombie);
  },
  generateSun: function () {
    let newsun = this.suns.getFirstDead();
    let x = this.game.rnd.integerInRange(40, 420);
    let y = -20;
    if (!newsun) {
      newsun = new Sun(this, x, y, this.sun_velocity);
      this.suns.add(newsun);
      newsun.increaseSun.add(this.updateSun, this);
    } else {
      newsun.reset(x, y);
    }
  },
  updateSun: function (points) {
    this.numSums += points;
    this.updateStats();
  },
};
