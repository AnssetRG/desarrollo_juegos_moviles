Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	//metodo que se ejecuta antes del create para los parámtros entre states
	init:function(currentLevel,msg,show){
		this.currentLevel = currentLevel ? currentLevel : 1;
		this.houseX = 60;
		this.sun_frecuency = 5;
		this.sun_velocity = 50;
		this.zombie_y_positions = [49,99,149,199,249];
	},
	create:function(){
		this.background = this.game.add.sprite(0,0,'background');
		this.createLand();
		this.crateGUI();
		this.bullets = this.game.add.group();
		this.plants = this.game.add.group();
		this.zombies = this.game.add.group();
		this.suns = this.game.add.group();

		this.numSums = 1000;
		this.hitSounds = this.game.add.audio('hit');
		this.loadLevel();
	},
	loadLevel:function(){

	},
	createLand:function(){
		this.patches = this.game.add.group();
		//crear en memoria algo con esas dimensiones
		var rectangle = this.game.add.bitmapData(40,50);
		//ctx: contexto
		rectangle.ctx.fillStyle = "#000";
		rectangle.ctx.fillRect(0,0,40,50);

		let j,patch,alpha;
		let dark = false;

		for(let i=0; i<10;i++){
			for(j=0;j<5;j++){
				//para la siguiente sesión esto debe ser una clase
				patch = new Patch(this.game,{x:64+i*40,y:24+j*50},rectangle);
				dark = patch.SetAlhpa(dark);
				this.patches.add(patch);
			}
		}
	},
	crateGUI:function(){
		let sun = this.game.add.sprite(10,this.game.height - 20, 'sun');
		sun.anchor.setTo(0.5);
		sun.scale.setTo(0.5);
		let style = {font: "14px Arial",fill:"#fff"}
		this.sunLabel = this.game.add.text(22,this.game.height - 28,'',style);
		this.updateStats();
		this.buttonData = JSON.parse(this.game.cache.getText("buttonData"));
		this.buttons = this.game.add.group();
		let button;
		this.buttonData.forEach(function(element,index){
			//para la siguiente sesión esto debe ser una clase
			//button = new Phaser.Button(this.game,80+index*40,this.game.height-35,element.btnAsset,this.clickButton,this);
			//button.buttonData = element;
			button = new Button(this.game,{x:80+index*40, y:this.game.height-35},element.btnAsset,this.clickButton,this)
			button.buttonData = element;
			this.buttons.add(button);
		},this);
	},
	clearSelection:function(){
		this.currentSelection = null;
		this.buttons.forEach(function(element){
			element.alpha = 1;
			element.selected = false;
		},this);
	},
	clickButton:function(sprite){
		if(sprite.selected){
			this.clearSelection();
		}
	},
	updateStats:function(){

	}
}