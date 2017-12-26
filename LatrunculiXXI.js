class LatrunculiXXI {
    constructor() {
        this.game_over = false;
        this.board_stack = [];
        this.move_stack = [];
        this.turn = 1; //1 or 2
        this.type = "player"; //"player" or "bot"
        this.number_plays = 0;
        this.initBoard();
    }

    initBoard() {
        let reply = function(data) {
            Game.board_stack[Game.number_plays] = data.board;
        };
        return prologRequest({ command: 'initialBoard', onSuccess: reply });
    }

    onBotMoveReceived(move) {
        this.move_stack[this.number_plays] = move;
        this.getMoveBoard(move);
    }

    onBoardReceived(board) {
        this.number_plays++;
        this.board_stack[this.number_plays] = board;
        this.turn = (this.turn === 1) ? 2 : 1;
    }

    onValidReceived(valid) {
        if (valid) {
            let move = this.move_stack[this.number_plays];
            this.getMoveBoard(move);
        }
    }

    onGameOver(isGameOver, winner) {
        this.game_over = isGameOver;
    }

    undo() {
        console.log("Undo");
        if (this.number_plays > 0) {
            this.board_stack.pop();
            this.move_stack.pop();
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

    getCurrentBoardJSON() {
        return JSON.stringify(this.board_stack[this.number_plays]);
    }

    /**
      Inputs a move to prolog and returns the resulting board
    */
    getMoveBoard(move) {
        return prologRequest({ command: 'move', args: [this.turn, move, this.getCurrentBoard()], onSuccess: this.onBoardReceived });
    }

    /**
      Requests a valid bot move to prolog and returns it
    */
    getBotMove() {
        return prologRequest({ command: 'bot_play', args: [this.turn, this.getCurrentBoard()], onSuccess: this.onBotMoveReceived });
    }

    /**
      Inputs a move to prolog to check if it's valid
    */
    checkValidMove(move) {
        this.move_stack[this.number_plays] = [this.turn, move];
        return prologRequest({ command: 'is_valid_move', args: [this.turn, move, this.getCurrentBoard()], onSuccess: this.onValidReceived });
    }

    /**
      Checks if the game is over
    */
    checkGameOver() {
        let reply = function(data) {
            Game.onGameOver(data.gameIsOver, data.winner);
        };
        return prologRequest({ command: 'gameIsOver', args: [this.getCurrentBoardJSON()], onSuccess: reply });
    }
}

var Game = new LatrunculiXXI();