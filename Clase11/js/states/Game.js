Game = function (game) {};

Game.prototype = {
  init: function () {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 8;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function () {
    this.backyard = this.game.add.sprite(0, 0, "backyard");
    this.blocks = this.game.add.group();

    this.board = new Board(
      this,
      this.NUM_ROWS,
      this.NUM_COLS,
      this.NUM_VARIATIONS
    );
    this.board.console();

    this.drawBoard();
  },
  drawBoard: function () {
    let i, j, block, square, x, y, data;

    let squareBitmap = this.game.add.bitmapData(
      this.BLOCK_SIZE + 4,
      this.BLOCK_SIZE + 4
    );
    squareBitmap.ctx.fillStyle = "#000";
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

    for (i = 0; i < this.NUM_ROWS; i++) {
      for (j = 0; j < this.NUM_COLS; j++) {
        x = 36 + j * (this.BLOCK_SIZE + 6);
        y = 150 + i * (this.BLOCK_SIZE + 6);

        square = this.add.sprite(x, y, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0.2;

        this.createBlock(x, y, {
          asset: "bean" + this.board.grid[i][j],
          row: i,
          col: j,
        });
      }
    }
  },
  createBlock: function (posX, posY, data) {
    let block = new Block(this, this.ANIMATION_TIME, posX, posY, data);
    this.blocks.add(block);
    return block;
  },
};
