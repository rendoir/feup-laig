/**
  game.pl

  This file is responsible for the ability to play the game, choosing a game mode and a bot difficulty. To play enter 'main.'.
**/


:- include('display.pl').
:- include('bot.pl').


/*******************************
            Common
*******************************/

/**
  main/0: Starts the game, showing the game mode menu and playing the chosen game mode.
**/
main :-
  mainMenu(Option),
  play(Option).


/**
  difficultyMenu/1: Shows the bot difficulty menu and reads the desired bot difficulty.
    Difficulty.
**/
difficultyMenu(Difficulty) :-
  printDifficultyMenu,
  repeat,
  readOption(Difficulty, 1, 2),
  !.


/**
  mainMenu/1: Shows the game mode menu and reads the desired game mode.
    Option.
**/
mainMenu(Option) :-
  printMenu,
  repeat,
  readOption(Option, 1, 4),
  !.


/**
  play/1: Plays the chosen game mode or exits the game.
    GameMode. 
**/
play(1) :- playPlayerVsPlayer.
play(2) :- difficultyMenu(Difficulty), playPlayerVsComputer(Difficulty).
play(3) :- difficultyMenu(Difficulty), playComputerVsComputer(Difficulty).
play(4).


/**
  isPieceOfPlayer/4: True if a piece belongs to a player.
    Board, PlayerNumber, X, Y.
**/
isPieceOfPlayer(Board, Player, X, Y) :-
  getMatrixElement(Y, X, Board, Piece),
  isPlayer(Player, Piece).


/**
  playPlayer/3: Allows a player to make a move.
    Board, Player, ModifiedBoard.
**/
playPlayer(Board, Player, NewBoard) :-
  repeat,
  format('Player ~d', [Player]), nl,
  write('  Enter source coordinates:'), nl,
  readCoordinates(Xi, Yi),
  isPieceOfPlayer(Board, Player, Xi, Yi),
  write('  Enter destination coordinates:'), nl,
  readCoordinates(Xf, Yf),
  move(Board, Xi, Yi, Xf, Yf, NewBoard),
  !.


/**
  playComputer/4: Allows a bot to generate and make a move.
    Board, Player, ModifiedBoard, Difficulty.
**/
playComputer(Board, Player, NewBoard, Difficulty) :-
  format('Computer ~d', [Player]), nl,
  pressEnterToContinue,
  write('  Generating moves...'), nl,
  moveComputer(Board, Player, NewBoard, Difficulty).



/*******************************
       Player vs Player
*******************************/

/**
  playPlayerVsPlayer/0: Initializes a PvP game and launches its game loop.
**/
playPlayerVsPlayer :-
  clearScreen,
  initialBoard(Board),
  drawBoard(Board), !,
  gameLoopPlayerVsPlayer(Board).

/**
  gameLoopPlayerVsPlayer/1: Runs the game loop of a PvP game.
    Board.
**/
gameLoopPlayerVsPlayer(Board) :-
  playPlayer(Board, 1, Board2),
  clearScreen,
  drawBoard(Board2), !,
  not(gameIsOver(Board2, _)),
  playPlayer(Board2, 2, Board3),
  clearScreen,
  drawBoard(Board3), !, 
  not(gameIsOver(Board3, _)),
  gameLoopPlayerVsPlayer(Board3).
gameLoopPlayerVsPlayer(_).



/*******************************
       Player vs Computer
*******************************/

/**
  playPlayerVsComputer/1: Initializes a PvB game and launches its game loop.
    BotDifficulty.
**/
playPlayerVsComputer(Difficulty) :-
  clearScreen,
  initialBoard(Board),
  drawBoard(Board), !,
  gameLoopPlayerVsComputer(Board, Difficulty).


/**
  gameLoopPlayerVsComputer/2: Runs the game loop of a PvB game.
    Board, BotDifficulty.
**/
gameLoopPlayerVsComputer(Board, Difficulty) :-
  playPlayer(Board, 1, Board2),
  clearScreen,
  drawBoard(Board2), !,
  not(gameIsOver(Board2, _)),
  playComputer(Board2, 2, Board3, Difficulty),
  clearScreen,
  drawBoard(Board3), !,
  not(gameIsOver(Board3, _)),
  gameLoopPlayerVsComputer(Board3, Difficulty).
gameLoopPlayerVsComputer(_, _).



/*******************************
       Computer vs Computer
*******************************/

/**
  playComputerVsComputer/1: Initializes a BvB game and launches its game loop.
    BotDifficulty.
**/
playComputerVsComputer(Difficulty) :-
  clearScreen,
  initialBoard(Board),
  drawBoard(Board), !,
  gameLoopComputerVsComputer(Board, Difficulty).


/**
  gameLoopComputerVsComputer/2: Runs the game loop of a BvB game.
    Board, BotDifficulty.
**/
gameLoopComputerVsComputer(Board, Difficulty) :-
  playComputer(Board, 1, Board2, Difficulty),
  clearScreen,
  drawBoard(Board2),!,
  not(gameIsOver(Board2, _)),
  playComputer(Board2, 2, Board3, Difficulty),
  clearScreen,
  drawBoard(Board3),!,
  not(gameIsOver(Board3, _)),
  gameLoopComputerVsComputer(Board3, Difficulty).
gameLoopComputerVsComputer(_,_).
