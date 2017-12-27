class LatrunculiXXI {
    constructor() {
        this.game_over = false;
        this.board_stack = [];
        this.move_stack = [];
        this.turn = 1; //1 or 2
        this.type = "player"; //"player" or "bot"
        this.playerOneType = "player"; //"player" or "bot"
        this.playerTwoType = "player"; //"player" or "bot"
        this.number_plays = 0;

        this.captured_pieces = [];
        this.initBoard();
    }

    addMove(move) {
        this.move_stack[this.number_plays] = move;
    }

    addBoard(board) {
        this.number_plays++;
        this.board_stack[this.number_plays] = board;
        this.turn = (this.turn === 1) ? 2 : 1;
        this.calculateCapturedPieces();
    }

    setGameOver(isGameOver, winner) {
        this.game_over = isGameOver;
    }

    /**
     * Get the current board
     * @returns {Object[][]} with the current board representation
     */
    getCurrentBoard() {
        return this.board_stack[this.number_plays];
    }

    /**
     * Get the current board in a String
     * @returns {string} with one Array of arrays of the current board representation;
     */
    getCurrentBoardString() {
        return JSON.stringify(this.board_stack[this.number_plays]);
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
     */
    initBoard() {
        /**
         * Receive the reply from server, when requested 'initialBoard';
         * @param {ReplyBoard} data 
         */
        let reply = function(data) {
            this.board_stack[this.number_plays] = data.board;
        };
        let request = createRequest('initialBoard', null, reply.bind(this));
        return prologRequest(request);
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

    /**
     * Requests for all possible moves for one player;
     * @param {number} player Player number to get his possible moves;
     */
    getAllMoves(player) {
        /**
         * Receive the reply from server, when requested 'getAllMoves';
         * @param {ReplyMoves} data Object with the reply from server;
         */
        let reply = function(data) {
            this.allMoves = data.moves;
        };
        let request = createRequest('getAllMoves', [player | this.turn, this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
    }

    /**
     * Requests a valid bot move to prolog and returns it and the board after the move;
     * @todo change hardcoded difficulty when called makeMove
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
        };
        let request = createRequest('makeMove', [this.turn, this.getCurrentBoardString(), 2], reply.bind(this));
        prologRequest(request);
    }

    /**
     * Inputs a move to prolog to get the NewBoard and check if is a valid move;
     * @param {object[]} move array of positions --> [Xi, Yi, Xf, Yf];
     */
    move(move) {
        this.move_stack[this.number_plays] = [this.turn, move];
        /**
         * Receive the reply from server when requested 'move';
         * @param {ReplyBoard} data Object with the reply from server;
         */
        let reply = function(data) {
            if (!data.return) {
                // Send a message to the User saying is not a valid move;
                return false;
            }
            this.onBoardReceived(data.board);
        };
        let request = createRequest('move', [this.turn, JSON.stringify(move), this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
    }

    /**
     * Send a request to know if game is over;
     */
    checkGameOver() {
        /**
         * Receive the reply from server when sent a request of 'gameIsOver';
         * @param {ReplyIsOver} data Object with the reply from server; 
         */
        let reply = function(data) {
            this.onGameOver(data.return, data.winner);
        };
        let request = createRequest('gameIsOver', [this.getCurrentBoardString()], reply.bind(this));
        prologRequest(request);
    }

    calculateCapturedPieces() {
        let new_board = this.number_plays[this.number_plays];
        let old_board = this.number_plays[this.number_plays - 1];
        let empty_cell = 0;
        let board_size = 8;

        this.captured_pieces = [];
        for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
                if (old_board[i][j] !== empty_cell && new_board[i][j] === empty_cell) {
                    captured_pieces.push([i, j]);
                }
            }
        }
    }
}

var Game = new LatrunculiXXI();