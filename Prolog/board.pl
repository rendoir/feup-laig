/**
  board.pl

  This file is responsible for holding and defining information about a board, its atoms and players.
**/

getBlackSoldier(2).
getWhiteSoldier(1).
getBlackDux(12).
getWhiteDux(11).
getEmptyCell(0).

/**
  initialBoard/1: Defines the initial board of the game.
    InitialBoard.
**/
initialBoard(Board) :-
  getBlackSoldier(BlackSoldier),
  getWhiteSoldier(WhiteSoldier),
  getBlackDux(BlackDux),
  getWhiteDux(WhiteDux),
  getEmptyCell(EmptyCell),
  Board = [
	[BlackSoldier, BlackSoldier, BlackSoldier, BlackSoldier, BlackSoldier, BlackSoldier, BlackSoldier, BlackSoldier],
	[EmptyCell, EmptyCell, EmptyCell, BlackDux, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	[EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell, EmptyCell],
	[EmptyCell, EmptyCell, EmptyCell, EmptyCell, WhiteDux, EmptyCell, EmptyCell, EmptyCell],
  [WhiteSoldier, WhiteSoldier, WhiteSoldier, WhiteSoldier, WhiteSoldier, WhiteSoldier, WhiteSoldier, WhiteSoldier]].

/**
  isPlayer/2: Tests if a piece atom belongs to a player.
    PlayerNumber, PieceAtom.
**/
isPlayer(1, Player) :- getWhiteSoldier(Player).
isPlayer(1, Player) :- getWhiteDux(Player).
isPlayer(2, Player) :- getBlackSoldier(Player).
isPlayer(2, Player) :- getBlackDux(Player).


/**
  isSoldier/3: Checks if a coordinate corresponds to a soldier in a board.
    Board, X, Y.
**/
isSoldier(Board, X, Y) :-
  getMatrixElement(Y, X, Board, Piece),!,
  isSoldier(Piece).


/**
  isDux/3: Checks if a coordinate corresponds to a dux in a board.
    Board, X, Y.
**/
isDux(Board, X, Y) :-
  getMatrixElement(Y, X, Board, Piece),!,
  isDux(Piece).


/**
  isSoldier/1: Checks if an atom is a soldier.
    Atom.
**/
isSoldier(Soldier) :- getWhiteSoldier(Soldier).
isSoldier(Soldier) :- getBlackSoldier(Soldier).


/**
  isDux/1: Checks if an atom is a dux.
    Atom.
**/
isDux(Dux) :- getWhiteDux(Dux).
isDux(Dux) :- getBlackDux(Dux).


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
isEmptyCell(0).


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
