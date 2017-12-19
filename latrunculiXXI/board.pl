/**
  board.pl

  This file is responsible for holding and defining information about a board, its atoms and players.
**/


/**
  initialBoard/1: Defines the initial board of the game.
    InitialBoard.
**/
initialBoard([
	[black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier],
	[empty_cell, empty_cell, empty_cell, black_dux, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, white_dux, empty_cell, empty_cell, empty_cell],
  	[white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier]]).

/**
  isPlayer/2: Tests if a piece atom belongs to a player.
    PlayerNumber, PieceAtom.
**/
isPlayer(1, white_soldier).
isPlayer(1, white_dux).
isPlayer(2, black_soldier).
isPlayer(2, black_dux).


/**
  isSoldier/3: Checks if a coordinate corresponds to a soldier in a board.
    Board, X, Y.
**/
isSoldier(Board, X, Y) :-
  getMatrixElement(Y, X, Board, Piece),
  isSoldier(Piece).


/**
  isDux/3: Checks if a coordinate corresponds to a dux in a board.
    Board, X, Y.
**/
isDux(Board, X, Y) :-
  getMatrixElement(Y, X, Board, Piece),
  isDux(Piece).


/**
  isSoldier/1: Checks if an atom is a soldier.
    Atom.
**/
isSoldier(black_soldier).
isSoldier(white_soldier).


/**
  isDux/1: Checks if an atom is a dux.
    Atom.
**/
isDux(black_dux).
isDux(white_dux).


/**
  isFriend/2: Checks if two pieces are from the same team.
    Piece1, Piece2.
**/
isFriend(Piece1, Piece2) :-
  isPlayer(1, Piece1),
  isPlayer(1, Piece2).
isFriend(Piece1, Piece2) :-
  isPlayer(2, Piece2),
  isPlayer(2, Piece1).


/**
  isEnemy/2: Checks if two pieces are from enemy teams.
    Piece1, Piece2.
**/
isEnemy(Piece1, Piece2) :-
  isPlayer(1, Piece1),
  isPlayer(2, Piece2).
isEnemy(Piece1, Piece2) :-
  isPlayer(1, Piece2),
  isPlayer(2, Piece1).


/**
  isEmptyCell/1: Checks if an atom corresponds to an empty cell.
    Atom.
**/
isEmptyCell(empty_cell).


/**
  isInsideBoard/2: Checks if a coordinate is inside the board.
    X, Y.
**/
isInsideBoard(X, Y) :-
  X >= 0, X =< 7,
  Y >= 0, Y =< 7.


/**
  isInsideBoard/2: Checks if a coordinate is in the corner of the board.
    X, Y.
**/
isInCorner(0, 0).
isInCorner(7, 0).
isInCorner(0, 7).
isInCorner(7, 7).


/**
  isInBorder/2: Checks if a coordinate is in the border of the board.
    X, Y.
**/
isInBorder(0, _).
isInBorder(7, _).
isInBorder(_, 0).
isInBorder(_, 7).
