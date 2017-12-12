class LatrunculiXXI {
  constructor(game_mode) {
    this.game_mode = game_mode;
    this.board_stack = [];
    this.move_stack = [];
    this.turn = 1;
    this.number_plays = 0;
  }

  playBot() {
    let move = getBotMove();
    this.move_stack[this.number_plays] = [this.turn, move];
    this.board_stack[this.number_plays] = getMoveBoard(move);
    this.number_plays++;
    this.turn = (this.turn === 1) ? 2 : 1;
  }

  playHuman(xi, yi, xf, yf) {
    if(isValidMove(xi, yi, xf, yf)) {
      let move = [xi, yi, xf, yf];
      this.board_stack[this.number_plays] = getMoveBoard(move);
      this.move_stack[this.number_plays] = [this.turn, move];
      this.number_plays++;
      this.turn = (this.turn === 1) ? 2 : 1;
      return true;
    } else {
      return false;
    }
  }

  undo() {
    if(this.number_plays > 0) {
      this.board_stack.pop();
      this.number_plays--;
      this.turn = (this.turn === 1) ? 2 : 1;
      return true;
    } else {
      return false;
    }
  }

  getCurrentBoard() {
    return this.board_stack[this.number_plays];
  }

  getMoveBoard(move) {
    return prologRequest('move', this.turn, move, getCurrentBoard());
  }

  getBotMove() {
    return prologRequest('bot_play', this.turn, getCurrentBoard());
  }

  isValidMove(move) {
    return prologRequest('is_valid_move', this.turn, move, getCurrentBoard());
  }
}
