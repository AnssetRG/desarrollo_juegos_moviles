window.onload = function(){
	let game = new Phaser.Game(360,700,Phaser.AUTO);
	//nombre del diccionario, nombra de la clase
	game.state.add('Preload',Preload);
	game.state.add('Game',Game);
	game.state.start('Preload');
}