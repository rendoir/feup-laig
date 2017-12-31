class LatrunculiXXI {
    /**
     * Creates an instance of LatrunculiXXI.
     * @memberof LatrunculiXXI
     */
    constructor() {
        this.game_over = false;
        this.board_stack = [];
        this.move_stack = [];
        this.captured_pieces_stack = [];
        this.turn = 1; //1 or 2
        this.playerOneType = "player"; //"player" or "bot"
        this.playerTwoType = "player"; //"player" or "bot"
        this.botLevel = 2;
        this.botLevelOne = 2;
        this.botLevelTwo = 2;
        this.type = this.playerOneType; //"player" or "bot"
        this.number_plays = 0;
        this.captured_pieces = [];
        this.stopBots = false;
        this.playingMovie = false;
        this.number_play_of_game_over = 0;
    }

    /**
     * (description)
     * @memberof LatrunculiXXI
     */
    resetGame() {
        this.game_over = false;
        this.move_stack = [];
        this.captured_pieces_stack = [];
        this.turn = 1; //1 or 2
        this.playerOneType = "player"; //"player" or "bot"
        this.playerTwoType = "player";
        this.type = this.playerOneType; //"player" or "bot"
        this.botLevel = this.botLevelOne;
        this.captured_pieces = [];
        this.stopBots = false;
        this.playingMovie = false;
        this.number_play_of_game_over = 0;
        this.initBoard();
    }

    /**
     * (description)
     * @param {number[]} move
     * @memberof LatrunculiXXI
     */
    addMove(move) {
        this.move_stack[this.number_plays] = [this.turn, move];
    }

    /**
     * (description)
     * @param {number[][]} board
     * @memberof LatrunculiXXI
     */
    addBoard(board) {
        this.number_plays++;
        this.board_stack[this.number_plays] = board;
        this.type = (this.turn === 1) ? this.playerTwoType : this.playerOneType;
        this.botLevel = (this.turn === 1) ? this.botLevelTwo : this.botLevelOne;
        this.turn = (this.turn === 1) ? 2 : 1;
        this.checkGameOver();
        this.calculateCapturedPieces();
    }

    /**
     * (description)
     * @param {boolean} isGameOver
     * @param {number} winner
     * @event gameOver fires the event when game is over
     * @memberof LatrunculiXXI
     */
    setGameOver(isGameOver, winner) {
        if (isGameOver) {
            console.log('Game Is Over');
            this.game_over = isGameOver;
            this.playingMovie = false;
            this.winner = winner;
            this.number_play_of_game_over = this.number_plays;
            dispatchEvent(new Event('gameOver', {}));
        } else if (!this.playingMovie) {
            this.getAllMoves();
        }
    }

    /**
     * Get the current board
     * @returns {number[][]} with the current board representation
     * @memberof LatrunculiXXI
     */
    getCurrentBoard() {
        return this.board_stack[this.number_plays];
    }

    /**
     * Get the current board in a String
     * @returns {string} with one Array of arrays of the current board representation;
     * @memberof LatrunculiXXI
     */
    getCurrentBoardString() {
        return JSON.stringify(this.getCurrentBoard());
    }

    /**
     * @typedef {object} ReplyBoard
     * @property {string} msg
     * @property {boolean} return               - value of function called in prolog
     * @property {number[][]} board             - Matrix with the board representation
     *
     * @typedef {object} ReplyMoves
     * @property {string} msg
     * @property {boolean} return               - value of function called in prolog
     * @property {number[][]} moves             - Matrix with all possible moves
     *
     * @typedef {object} ReplyMakeMove
     * @property {string} msg
     * @property {boolean} return               - value of function called in prolog
     * @property {number[]} move                - Array with move done by the server --> [Xi, Yi, Xf, Yf]
     * @property {number[][]} board             - Matrix with the board representation
     *
     * @typedef {object} ReplyIsOver
     * @property {string} msg
     * @property {boolean} return               - value of function called in prolog
     * @property {number} winner                - number of the winner of the game
     */

    /**
     * Request of the initial board representation;
     * @memberof LatrunculiXXI
     */
    initBoard() {
        /**
         * Receive the reply from server, when requested 'initialBoard';
         * @param {ReplyBoard} data
         * @event gameLoaded
         */
        let reply = function(data) {
            this.board_stack = [];
            this.number_plays = 0;
            this.board_stack[this.number_plays] = data.board;
            this.getAllMoves();
            dispatchEvent(new CustomEvent('gameLoaded', { detail: data.board }));
        };
        this.loading = true;
        let request = createRequest('initialBoard', null, reply.bind(this));
        return prologRequest(request);
    }

    /**
     * (description)
     * @returns {boolean} if can do undo or not
     * @memberof LatrunculiXXI
     */
    undo() {
        console.log("Undo");
        if (this.number_plays > 0 && !this.playingMovie) {
            this.stopBots = true;
            let lastMove = this.move_stack[this.number_plays - 1];
            let capture = this.captured_pieces_stack[this.number_plays - 1];
            this.board_stack.pop();
            this.move_stack.pop();
            this.captured_pieces_stack.pop();
            this.number_plays--;
            this.type = (this.turn === 1) ? this.playerTwoType : this.playerOneType;
            this.turn = (this.turn === 1) ? 2 : 1;
            if (this.game_over) {
                this.game_over = false;
                this.winner = null;
            }
            this.getAllMoves();
            dispatchEvent(new Event('undoCapture', {}));
            dispatchEvent(new CustomEvent('receivedMove', {
                detail: [
                    lastMove[1][2],
                    lastMove[1][3],
                    lastMove[1][0],
                    lastMove[1][1]
                ]
            }));
            return true;
        } else {
            return false;
        }
    }

    /**
     * Requests for all possible moves for one player;
     * @memberof LatrunculiXXI
     */
    getAllMoves() {
        /**
         * Receive the reply from server, when requested 'getAllMoves';
         * @param {ReplyMoves} data Object with the reply from server;
         */
        let reply = function(data) {
            this.allMoves = data.moves;
        };
        let request = createRequest('getAllMoves', [this.turn, this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
    }

    /**
     * Requests a valid bot move to prolog and returns it and the board after the move;
     * @todo change hardcoded difficulty when called makeMove
     * @memberof LatrunculiXXI
     */
    makeMove() {
        /**
         * Receive the reply from server, when requested 'makeMove';
         * @param {ReplyMakeMove} data Object with the reply from server;
         */
        let reply = function(data) {
            if (!data.return) {
                return;
            }
            this.addMove(data.move);
            this.addBoard(data.board);
            dispatchEvent(new CustomEvent('receivedMove', { detail: data.move }));
        };
        let request = createRequest('makeMove', [this.turn, this.getCurrentBoardString(), this.botLevel], reply.bind(this));
        prologRequest(request);
    }

    play() {
        if (!this.game_over && !this.stopBots && !this.playingMovie) {
            if (this.playerOneType == "bot" && this.turn == 1) { //"player" or "bot"
                this.makeMove();
            } else if (this.playerTwoType == "bot" && this.turn == 2) { //"player" or "bot")
                this.makeMove();
            }
        } else if (!this.game_over && !this.stopBots && this.playingMovie) {
            this.number_plays++;
            this.type = (this.turn === 1) ? this.playerTwoType : this.playerOneType;
            this.botLevel = (this.turn === 1) ? this.botLevelTwo : this.botLevelOne;
            this.turn = (this.turn === 1) ? 2 : 1;
            if (this.number_play_of_game_over === this.number_plays) {
                this.setGameOver(true, this.winner);
            }
            this.captured_pieces = this.captured_pieces_stack[this.number_plays];
            if (this.captured_pieces.length > 0) {
                dispatchEvent(new Event('pieceCapture', {}));
            }
            dispatchEvent(new CustomEvent('receivedMove', { detail: this.move_stack[this.number_plays - 1][1] }));
        }
    }

    /**
     * Inputs a move to prolog to get the NewBoard and check if is a valid move;
     * @param {number[]} move array of positions --> [Xi, Yi, Xf, Yf];
     * @memberof LatrunculiXXI
     */
    move(move) {
        /**
         * Receive the reply from server when requested 'move';
         * @param {ReplyBoard} data Object with the reply from server;
         */
        let reply = function(data) {
            if (!data.return) {
                /** @todo Send a message to the User saying is not a valid move; */
                return false;
            }
            this.addBoard(data.board);
        };
        if (!this.allMoves.some(element => {
                return equals(element, move);
            })) {
            /** @todo Send a message to the User saying is not a valid move; */
            return false;
        }
        this.addMove(move);
        let request = createRequest('move', [this.turn, JSON.stringify(move), this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
        return true;
    }

    /**
     * Send a request to know if game is over;
     * @memberof LatrunculiXXI
     */
    checkGameOver() {
        /**
         * Receive the reply from server when sent a request of 'gameIsOver';
         * @param {ReplyIsOver} data Object with the reply from server;
         */
        let reply = function(data) {
            this.setGameOver(data.return, data.winner); /** @todo check winner received from server */
        };
        let request = createRequest('gameIsOver', [this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
    }

    /**
     * (description)
     * @event pieceCapture fires the event when a piece is capture
     * @memberof LatrunculiXXI
     */
    calculateCapturedPieces() {
        let new_board = this.board_stack[this.number_plays];
        let old_board = this.board_stack[this.number_plays - 1];
        let board_size = new_board.length;
        let lastMove_Xi = this.move_stack[this.number_plays - 1][1][0];
        let lastMove_Yi = this.move_stack[this.number_plays - 1][1][1];

        this.captured_pieces = [];
        for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
                if (i == lastMove_Yi && j == lastMove_Xi) {
                    continue;
                }
                if (old_board[i][j] !== 0 && new_board[i][j] === 0) {
                    this.captured_pieces.push([j, i]);
                }
            }
        }
        this.captured_pieces_stack[this.number_plays] = this.captured_pieces;
        if (this.captured_pieces.length > 0) {
            dispatchEvent(new Event('pieceCapture', {}));
        }
    }


    playMovie() {
        if (!this.game_over) {
            console.log("Game not over");
            return;
        }
        console.log("Playing movie");
        this.number_plays = 0;
        this.game_over = false;
        this.playingMovie = true;
        dispatchEvent(new CustomEvent('gameLoaded', { detail: this.board_stack[this.number_plays] }));
        dispatchEvent(new CustomEvent('receivedMove', { detail: this.move_stack[this.number_plays][1] }));
    }

    skipTurn() {
        this.type = (this.turn === 1) ? this.playerTwoType : this.playerOneType;
        this.botLevel = (this.turn === 1) ? this.botLevelTwo : this.botLevelOne;
        this.turn = (this.turn === 1) ? 2 : 1;
    }

}

/**
 * Compare two Arrays
 * @param {Array} param1
 * @param {Array} param2
 */
function equals(param1, param2) {
    if (!Array.isArray)
        return;
    if (!Array.isArray(param1) || !Array.isArray(param2)) {
        return false;
    }
    if (param1.length != param2.length) {
        return false;
    }
    for (i = 0; i < param1.length; i++) {
        if ((param1[i] === param2[i]))
            continue;
        return false;
    }
    return true;
}

var Game = new LatrunculiXXI();