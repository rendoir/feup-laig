/**
  moves.pl

  This file is responsible for validating a move and executing it.
**/


:-include('captures.pl').
:-include('utilities.pl').
:-include('board.pl').


/**
  isElementBetween/5: True if there are no elements between two coordinates.
    Board, Xi, Yi, Xf, Yf.
**/
isElementBetween(_, X, Y, X, Y).
isElementBetween(Board, Xi, Yi, Xf, Yf) :-
  Yf = Yi,
  nextStep(Xi,Xf,Xn),
  getMatrixElement(Yf, Xn, Board, CurrentCell),!,
  isEmptyCell(CurrentCell),
  isElementBetween(Board, Xn, Yi, Xf, Yf).
isElementBetween(Board, Xi, Yi, Xf, Yf) :-
  Xf = Xi,
  nextStep(Yi,Yf,Yn),
  getMatrixElement(Yn, Xf, Board, CurrentCell),!,
  isEmptyCell(CurrentCell),
  isElementBetween(Board, Xi, Yn, Xf, Yf).


/**
  isOrthogonal/4: True if the move is orthogonal.
    Xi, Yi, Xf, Yf.
 **/
isOrthogonal(Xi, Yi, Xf, Yf) :-
  Xi = Xf ; Yi = Yf.


/**
  friendDuxImmobilized/5: True if a move would immobilize its own dux.
    Board, Xi, Yi, Xf, Yf.
	A dux is immobilized if all of his directions are blocked.
**/
friendDuxImmobilized(Board, Xi, Yi, Xf, Yf) :- friendDuxImmobilized(Board, Xi, Yi, Xf, Yf, next, horizontal).
friendDuxImmobilized(Board, Xi, Yi, Xf, Yf) :- friendDuxImmobilized(Board, Xi, Yi, Xf, Yf, before, horizontal).
friendDuxImmobilized(Board, Xi, Yi, Xf, Yf) :- friendDuxImmobilized(Board, Xi, Yi, Xf, Yf, next, vertical).
friendDuxImmobilized(Board, Xi, Yi, Xf, Yf) :- friendDuxImmobilized(Board, Xi, Yi, Xf, Yf, before, vertical).
friendDuxImmobilized(Board, Xi, Yi, Xf, Yf, Step, Direction) :-
  getMatrixElement(Yi, Xi, Board, PieceToMove),
  stepDirection(Xf, Yf, StepX, StepY, Step, Direction),
  getMatrixElement(StepY, StepX, Board, AdjacentPiece),
  isDux(AdjacentPiece),
  isFriend(AdjacentPiece, PieceToMove),
  getFriendsAround(Board, StepX, StepY, CounterF),
  getEnemiesAround(Board, StepX, StepY, CounterE),
  Counter is CounterF + CounterE,
  getMaxPiecesAround(StepX, StepY, Max),
  DuxMax is Max - 1,
  Counter >= DuxMax.


/**
  isEnemyDuxAround/3: True if there is an enemy dux around a coordinate.
    Board, X, Y.
**/
isEnemyDuxAround(Board, X, Y) :- isEnemyDuxAround(Board, X, Y, next, horizontal).
isEnemyDuxAround(Board, X, Y) :- isEnemyDuxAround(Board, X, Y, before, horizontal).
isEnemyDuxAround(Board, X, Y) :- isEnemyDuxAround(Board, X, Y, next, vertical).
isEnemyDuxAround(Board, X, Y) :- isEnemyDuxAround(Board, X, Y, before, vertical).
isEnemyDuxAround(Board, X, Y, Step, Direction) :-
  getMatrixElement(Y, X, Board, Piece),
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  getMatrixElement(StepY, StepX, Board, AdjacentPiece),
  isDux(AdjacentPiece),
  isEnemy(AdjacentPiece, Piece).


/**
  moveIsOffensive/5: True if a move is offensive.
    Board, Xi, Yi, Xf, Yf.
	A move is considered offensive if it is a hit to the enemy dux or a capture.
**/
moveIsOffensive(Board, Xi, Yi, Xf, Yf) :-
  simulateMove(Board, Xi, Yi, Xf, Yf, SimulationBoard),
  isEnemyDuxAround(SimulationBoard, Xf, Yf).
moveIsOffensive(Board, Xi, Yi, Xf, Yf) :-
  simulateMove(Board, Xi, Yi, Xf, Yf, SimulationBoard),
  isEnemySoldierCapturedClassic(SimulationBoard, Xf, Yf).
moveIsOffensive(Board, Xi, Yi, Xf, Yf) :-
  isEnemySoldierCapturedXXI(Board, Xi, Yi, Xf, Yf).


/**
  moveIsDefensive/5: True if a move is defensive.
    Board, Xi, Yi, Xf, Yf.
	A move is defensive if it is not offensive.
**/
moveIsDefensive(Board, Xi, Yi, Xf, Yf) :-
  not(moveIsOffensive(Board, Xi, Yi, Xf, Yf)).


/**
  moveIsOneSquare/4: True if a piece just moves one square in a move.
    Xi, Yi, Xf, Yf.
**/
moveIsOneSquare(Xi, _, Xf, _) :-
  DeltaX is Xi - Xf,
  abs(DeltaX, AbsoluteDeltaX),
  AbsoluteDeltaX =:= 1.
moveIsOneSquare(_, Yi, _, Yf) :-
  DeltaY is Yi - Yf,
  abs(DeltaY, AbsoluteDeltaY),
  AbsoluteDeltaY =:= 1.

/**
  simulateMove/6: Simulates a move without checking if it is a valid move.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard.
**/
simulateMove(Board, Xi, Yi, Xf, Yf, FinalBoard) :-
  getMatrixElement(Yi, Xi, Board, FromCell),
  getEmptyCell(EmptyCell),
  setMatrixElement(Yi, Xi, EmptyCell, Board, ModifiedBoard),
  setMatrixElement(Yf, Xf, FromCell, ModifiedBoard, FinalBoard).


/**
  checkLockedSoldier/5: True if a soldier is not locked or he is but can move.
    Board, Xi, Yi, Xf, Yf.
	Valid situations: He is not a soldier; the move is offensive; all the enemies around him have two or more enemies around him.
  checkLockedSoldier/7: Check the last valid situation in all directions and steps.
    Board, Xi, Yi, Xf, Yf, Step, Direction.
**/
checkLockedSoldier(Board, Xi, Yi, _, _) :- not(isSoldier(Board, Xi, Yi)).
checkLockedSoldier(Board, Xi, Yi, Xf, Yf) :- moveIsOffensive(Board, Xi, Yi, Xf, Yf).
checkLockedSoldier(Board, Xi, Yi, _, _) :-
  not(checkLockedSoldier(Board, Xi, Yi, _, _, next, horizontal)),
  not(checkLockedSoldier(Board, Xi, Yi, _, _, before, horizontal)),
  not(checkLockedSoldier(Board, Xi, Yi, _, _, next, vertical)),
  not(checkLockedSoldier(Board, Xi, Yi, _, _, before, vertical)).

checkLockedSoldier(Board, X, Y, _, _, Step, Direction) :-
  getMatrixElement(Y, X, Board, Piece),
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  getMatrixElement(StepY, StepX, Board, Adjacent),
  isEnemy(Piece, Adjacent),
  getEnemiesAround(Board, StepX, StepY, Counter),
  Counter < 2.


/**
  checkDuxMobility/5: True if the mobility rules of the dux allow him to move.
    Board, Xi, Yi, Xf, Yf.
  checkDuxMobility/6: True if the blocked paths allow the dux to move taking into account his position.
    Board, Xi, Yi, Xf, Yf, BlockedPaths.
**/
checkDuxMobility(Board, Xi, Yi, _, _) :- not(isDux(Board, Xi, Yi)).
checkDuxMobility(Board, Xi, Yi, Xf, Yf) :-
  getBlockedPaths(Board, Xi, Yi, BlockedPaths),
  checkDuxMobility(Board, Xi, Yi, Xf, Yf, BlockedPaths).

checkDuxMobility(_, _, _, _, _, 0).
checkDuxMobility(_, Xi, Yi, Xf, Yf, 1) :-
  not(isInCorner(Xi, Yi)),
  moveIsOneSquare(Xi, Yi, Xf, Yf).
checkDuxMobility(Board, Xi, Yi, Xf, Yf, 1) :-
  not(isInCorner(Xi, Yi)),
  moveIsOffensive(Board, Xi, Yi, Xf, Yf).
checkDuxMobility(Board, Xi, Yi, Xf, Yf, 2) :-
  not(isInCorner(Xi, Yi)),
  not(isInBorder(Xi, Yi)),
  moveIsOffensive(Board, Xi, Yi, Xf, Yf).


/**
  move/6: True if a move is valid. Checks for captures and applies a move.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard. 
 **/
move(Board, Xi, Yi, Xf, Yf, FinalBoard) :-
  isInsideBoard(Xi, Yi),!,
  isInsideBoard(Xf, Yf),!,
  isOrthogonal(Xi, Yi, Xf, Yf),!,

  getMatrixElement(Yi, Xi, Board, FromCell),!,
  not(isEmptyCell(FromCell)),!,

  getMatrixElement(Yf, Xf, Board, ToCell),!,
  isEmptyCell(ToCell),!,

  isElementBetween(Board, Xi, Yi, Xf, Yf),!,
  checkLockedSoldier(Board, Xi, Yi, Xf, Yf),!,
  checkDuxMobility(Board, Xi, Yi, Xf, Yf),!,
  not(friendDuxImmobilized(Board, Xi, Yi, Xf, Yf)),

  captureXXI(Board, Xi, Yi, Xf, Yf, CaptureBoard),

  getEmptyCell(EmptyCell),
  setMatrixElement(Yi, Xi, EmptyCell, CaptureBoard, MovedBoard),
  setMatrixElement(Yf, Xf, FromCell, MovedBoard, MovedBoard2),

  captureClassic(MovedBoard2, Xf, Yf, FinalBoard).


/**
  move/7: True if a move is valid. Checks for captures and applies a move. Also checks if the piece belongs to the player.
    Player, Board, Xi, Yi, Xf, Yf, ModifiedBoard. 
 **/
move(Player, Board, Xi, Yi, Xf, Yf, FinalBoard) :-
  getMatrixElement(Yi, Xi, Board, Piece),
  isPlayer(Player, Piece),
  move(Board, Xi, Yi, Xf, Yf, FinalBoard).
