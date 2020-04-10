Game = function(game){}

Game.prototype = {
	create:function(){
		let background = this.add.sprite(0,0,"background");
		background.inputEnabled = true;
		background.events.onInputDown.add(this.clickBackgorund,this);
		let horizontal = this.world.width / 4;
		let	init = 45;

		this.elements = [];
		let elements_key = ["candy","apple","rotate","rubber_duck"];
		this.selectedObj  = null;
		this.currentKey = "";

		let dummy_temp;
		for(let i=0; i<elements_key.length;i++){
			dummy_temp = this.add.sprite(0,0,elements_key[i]);
			dummy_temp.anchor.setTo(0.5);
			dummy_temp.y = this.world.height*3/4;
			dummy_temp.x = (horizontal*i)+init;
			this.elements.push(dummy_temp);
			dummy_temp.inputEnabled = true;
			dummy_temp.events.onInputDown.add(this.clickElement,this);
		}

		this.pet = this.add.sprite(0,0,"pet");
		this.pet.anchor.setTo(0.5);
		this.pet.y = this.world.height*2/4;
		this.pet.x = this.world.width/2;

		this.pet.animations.add("funnyfaces",[1,2,3,2,1],7,false);
	},
	clickBackgorund:function(sprite,event){
		if(this.currentKey != ""){
			this.clone(event.position);
		}
	},
	clone:function(position){
		let elements_clone = this.add.sprite(0,0,this.currentKey);
		elements_clone.anchor.setTo(0.5);
		elements_clone.x = position.x;
		elements_clone.y = position.y;

		let tween = this.add.tween(this.pet).to({x:elements_clone.x, y:elements_clone.y});
		tween.start();
		tween.onComplete.add(this.playAnimation,this);
		tween.onComplete.add(this.destroyFunction,this);
		this.pet.bringToTop();
	},
	destroyFunction:function(sprite){
		sprite.destroy();
	},
	playAnimation:function(){
		this.pet.animations.play("funnyfaces");
	},
	clickElement:function(sprite){
		//sprite.key
		if(this.selectedObj != null){
            this.selectedObj.alpha = 1;
        }
        this.selectedObj = sprite;
        this.currentKey = sprite.key;
        this.selectedObj.alpha = 0.6;
	}
}