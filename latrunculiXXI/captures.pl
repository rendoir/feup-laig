/**
  captures.pl

  This file is responsible for checking for captures and capturing pieces by applying the game rules.
**/


/**
  isBetweenEnemies/3: True if a piece is between enemies.
    Board, X, Y.
**/
isBetweenEnemies(Board, X, Y) :-
  isEnemyAround(Board, X, Y, next, horizontal),
  isEnemyAround(Board, X, Y, before, horizontal).
isBetweenEnemies(Board, X, Y) :-
  isEnemyAround(Board, X, Y, next, vertical),
  isEnemyAround(Board, X, Y, before, vertical).


/**
  isEnemyAround/5: True if an adjacent piece is an enemy in a given step and direction.
    Board, X, Y, Step, Direction.
**/
isEnemyAround(Board, X, Y, Step, Direction) :-
  getMatrixElement(Y, X, Board, Piece),
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  isInsideBoard(StepX, StepY),
  getMatrixElement(StepY, StepX, Board, Element),
  isEnemy(Piece, Element).
isEnemyAround(Board, X, Y, Step, Direction, Piece) :-
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  isInsideBoard(StepX, StepY),
  getMatrixElement(StepY, StepX, Board, Element),
  isEnemy(Piece, Element).


/**
  getEnemiesAround/4: Get the number of enemies around a piece.
    Board, X, Y, Counter.
**/
getEnemiesAround(Board, X, Y, Counter) :-
  getMatrixElement(Y, X, Board, Piece),
  not(isEmptyCell(Piece)),
  Counter0 is 0,
  check(isEnemyAround(Board, X, Y, next, horizontal, Piece), Result0),
  Counter1 is Counter0 + Result0,
  check(isEnemyAround(Board, X, Y, before, horizontal, Piece), Result1),
  Counter2 is Counter1 + Result1,
  check(isEnemyAround(Board, X, Y, next, vertical, Piece), Result2),
  Counter3 is Counter2 + Result2,
  check(isEnemyAround(Board, X, Y, before, vertical, Piece), Result3),
  Counter is Counter3 + Result3.


/**
  isFriendAround/5: True if an adjacent piece is a friend in a given step and direction.
    Board, X, Y, Step, Direction.
**/
isFriendAround(Board, X, Y, Step, Direction) :-
  getMatrixElement(Y, X, Board, Piece),
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  isInsideBoard(StepX, StepY),
  getMatrixElement(StepY, StepX, Board, Element),
  isFriend(Piece, Element).
isFriendAround(Board, X, Y, Step, Direction, Piece) :-
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  isInsideBoard(StepX, StepY),
  getMatrixElement(StepY, StepX, Board, Element),
  isFriend(Piece, Element).


/**
  getFriendsAround/4: Get the number of friends around a piece.
    Board, X, Y, Counter.
**/
getFriendsAround(Board, X, Y, Counter) :-
  getMatrixElement(Y, X, Board, Piece),
  not(isEmptyCell(Piece)),
  Counter0 is 0,
  check(isFriendAround(Board, X, Y, next, horizontal, Piece), Result0),
  Counter1 is Counter0 + Result0,
  check(isFriendAround(Board, X, Y, before, horizontal, Piece), Result1),
  Counter2 is Counter1 + Result1,
  check(isFriendAround(Board, X, Y, next, vertical, Piece), Result2),
  Counter3 is Counter2 + Result2,
  check(isFriendAround(Board, X, Y, before, vertical, Piece), Result3),
  Counter is Counter3 + Result3.


/**
  getBlockedPaths/4: Get the number of blocked paths.
    Board, X, Y, Counter.
	A piece has blocked paths if it is surrounded by at least one enemy.
**/
getBlockedPaths(Board, X, Y, Counter) :-
  getEnemiesAround(Board, X, Y, CounterE),
  CounterE > 0,
  getFriendsAround(Board, X, Y, CounterF),
  Counter is CounterE + CounterF, !.
getBlockedPaths(_, _, _, Counter) :- Counter is 0.


/**
  capturePiece/4: Captures a piece, removing it from the board.
    Board, X, Y, ModifiedBoard.
**/
capturePiece(Board, X, Y, ModifiedBoard) :-
  getEmptyCell(EmptyCell),
  setMatrixElement(Y, X, EmptyCell, Board, ModifiedBoard).


/**
  isEnemySoldierCapturedClassic/3: True if a soldier around is captured by the classic rules.
    Board, X, Y.

  isEnemySoldierCapturedClassic/5: True if a soldier is captured by the classic rules in a certain step and direction.
    Board, X, Y, Step, Direction.
**/
isEnemySoldierCapturedClassic(Board, Xf, Yf) :- isEnemySoldierCapturedClassic(Board, Xf, Yf, next, horizontal).
isEnemySoldierCapturedClassic(Board, Xf, Yf) :- isEnemySoldierCapturedClassic(Board, Xf, Yf, before, horizontal).
isEnemySoldierCapturedClassic(Board, Xf, Yf) :- isEnemySoldierCapturedClassic(Board, Xf, Yf, next, vertical).
isEnemySoldierCapturedClassic(Board, Xf, Yf) :- isEnemySoldierCapturedClassic(Board, Xf, Yf, before, vertical).
isEnemySoldierCapturedClassic(Board, X, Y, Step, Direction) :-
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  isCaptured(Board, StepX, StepY).


/**
  isEnemySoldierCapturedXXI/5: True if a move captures a soldier by the XXI rules.
    Board, Xi, Yi, Xf, Yf.
**/
isEnemySoldierCapturedXXI(Board, Xi, Yi, Xf, Yf) :- isPushAndCrush(Board, Xi, Yi, Xf, Yf, _, _).
isEnemySoldierCapturedXXI(Board, Xi, Yi, Xf, Yf) :- isFlank(Board, Xi, Yi, Xf, Yf, _, _).
isEnemySoldierCapturedXXI(Board, Xi, Yi, Xf, Yf) :- isPhalanx(Board, Xi, Yi, Xf, Yf, _, _).


/**
  isPushAndCrush/7: True if a move causes a Push and Crush attack.
    Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY.
	EnemyX, EnemyY - The coordinates of a Push and Crush attack victim.
    A Push and Crush can occur in two situations: against the border and against a friendly piece.
**/
isPushAndCrush(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY) :-
  getMatrixElement(Yi, Xi, Board, Piece),
  getDirection(Xi, Yi, Xf, Yf, Direction),
  getStep(Xi, Yi, Xf, Yf, Step, Direction),
  stepDirection(Xf, Yf, FriendX, FriendY, Step, Direction),
  getMatrixElement(FriendY, FriendX, Board, FriendPiece),
  isFriend(Piece, FriendPiece),
  stepDirection(FriendX, FriendY, EnemyX, EnemyY, Step, Direction),
  getMatrixElement(EnemyY, EnemyX, Board, EnemyPiece),
  isEnemy(Piece, EnemyPiece),
  isSoldier(EnemyPiece),
  isInBorder(EnemyX, EnemyY).
isPushAndCrush(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY) :-
  getMatrixElement(Yi, Xi, Board, Piece),
  getDirection(Xi, Yi, Xf, Yf, Direction),
  getStep(Xi, Yi, Xf, Yf, Step, Direction),
  stepDirection(Xf, Yf, FriendX, FriendY, Step, Direction),
  getMatrixElement(FriendY, FriendX, Board, FriendPiece),
  isFriend(Piece, FriendPiece),
  stepDirection(FriendX, FriendY, EnemyX, EnemyY, Step, Direction),
  getMatrixElement(EnemyY, EnemyX, Board, EnemyPiece),
  isEnemy(Piece, EnemyPiece),
  isSoldier(EnemyPiece),
  stepDirection(EnemyX, EnemyY, Friend2X, Friend2Y, Step, Direction),
  getMatrixElement(Friend2Y, Friend2X, Board, FriendPiece2),
  isFriend(Piece, FriendPiece2).


/**
  isFlank/7: True if a move causes a Flank attack.
  Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY.
	EnemyX, EnemyY - The coordinates of a Flank attack victim.
**/
isFlank(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY) :-
  getMatrixElement(Yi, Xi, Board, Piece),
  getDirection(Xi, Yi, Xf, Yf, Direction),
  getStep(Xi, Yi, Xf, Yf, Step, Direction),
  stepDirection(Xf, Yf, EnemyX, EnemyY, Step, Direction),
  getMatrixElement(EnemyY, EnemyX, Board, EnemyPiece),
  isEnemy(Piece, EnemyPiece),
  isSoldier(EnemyPiece),
  isLinearFormation(Board, Piece, EnemyX, EnemyY, Step, Direction).


/**
  isLinearFormation/6: True if there is a linear formation in a certain step and direction.
    Board, Piece, X, Y, Step, Direction.
    It is considered a linear formation if a there is a line of friendly pieces ending in an enemy.
**/
isLinearFormation(Board, Piece, X, Y, Step, Direction) :-
  stepDirection(X, Y, EnemyX, EnemyY, Step, Direction),
  getMatrixElement(EnemyY, EnemyX, Board, EnemyPiece),
  isEnemy(Piece, EnemyPiece),
  isLinearFormation(Board, Piece, EnemyX, EnemyY, Step, Direction).
isLinearFormation(Board, Piece, X, Y, Step, Direction) :-
  stepDirection(X, Y, FriendX, FriendY, Step, Direction),
  getMatrixElement(FriendY, FriendX, Board, FriendPiece),
  isFriend(Piece, FriendPiece).


/**
  isPhalanx/7: True if a move causes a Phalanx attack.
    Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY.
	EnemyX, EnemyY - The coordinates of a Phalanx attack victim.
**/
isPhalanx(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY) :-
  getMatrixElement(Yi, Xi, Board, Piece),
  getDirection(Xi, Yi, Xf, Yf, Direction),
  getStep(Xi, Yi, Xf, Yf, Step, Direction),
  getLinearFriends(Board, Piece, Xf, Yf, Step, Direction, NumberFriends),
  NumberFriends >= 1,
  StepToEnemy is NumberFriends + 1,
  stepNDirection(Xf, Yf, EnemyX, EnemyY, Step, Direction, StepToEnemy),
  getMatrixElement(EnemyY, EnemyX, Board, Enemy),
  isEnemy(Piece, Enemy),
  isSoldier(Enemy),
  checkTestudo(Board, Piece, Xf, Yf, Step, Direction, NumberFriends).


/**
  checkTestudo/7: True if there is a testudo around a coordinate in a certain direction and step.
    Board, Piece, Xf, Yf, Step, Direction, NumberFriends.
	NumberFriends - Number of friends in the linear formation. This sets the minimum dimension minus one for the testudo in the designated direction and step.
**/
checkTestudo(Board, Piece, Xf, Yf, Step, Direction, NumberFriends) :-
  getOppositeDirection(Direction, OppositeDirection),
  stepDirection(Xf, Yf, NextLineX, NextLineY, next, OppositeDirection),
  checkTestudoLine(Board, Piece, NextLineX, NextLineY, Step, Direction, NumberFriends).
checkTestudo(Board, Piece, Xf, Yf, Step, Direction, NumberFriends) :-
  getOppositeDirection(Direction, OppositeDirection),
  stepDirection(Xf, Yf, NextLineX, NextLineY, before, OppositeDirection),
  checkTestudoLine(Board, Piece, NextLineX, NextLineY, Step, Direction, NumberFriends).


/**
  checkTestudoLine/7: True if there are 'NumberFriends' + 1 friends forming a testudo line.
    Board, Piece, X, Y, Step, Direction, NumberFriends.
	NumberFriends - Number of friends in the linear formation. This sets the minimum dimension minus one for the testudo in the designated direction and step.
**/
checkTestudoLine(_, _, _, _, _, _, -1).
checkTestudoLine(Board, Piece, X, Y, Step, Direction, NumberFriends) :-
  getMatrixElement(Y, X, Board, FriendPiece),
  isFriend(Piece, FriendPiece),
  stepDirection(X, Y, StepX, StepY, Step, Direction),
  FriendsLeft is NumberFriends - 1,
  checkTestudoLine(Board, Piece, StepX, StepY, Step, Direction, FriendsLeft).


/**
  isNextFriend/9: True if the next piece in a direction and step is a friend.
    Board, Piece, X, Y, NextX, NextY, Step, Direction, Result.
	Result - (1 -> Is friend, 0 -> Is not a friend).
**/
isNextFriend(Board, Piece, X, Y, NextX, NextY, Step, Direction, Result) :-
  stepDirection(X, Y, NextX, NextY, Step, Direction),
  getMatrixElement(NextY, NextX, Board, FriendPiece),
  isFriend(Piece, FriendPiece),
  Result is 1.
isNextFriend(_, _, _, _, _, _, _, _, Result) :-
  Result is 0.


/**
  getLinearFriends/7: Gets the number of friends in a line.
    Board, Piece, X, Y, Step, Direction, NumberFriends.
	NumberFriends - Number of friends in the linear formation. This sets the minimum dimension minus one for the testudo in the designated direction and step.

  getLinearFriends/9: Helper predicate - increments the counter of friends.
    Board, Piece, X, Y, Step, Direction, TemporaryCounter, WasFriend, FinalCounter.
	TemporaryCounter - Temporary counter (unified to 0 at the start).
	WasFriend - Result of isNextFriend.
	FinalCounter - Final counter (not unified until WasFriend is 0, which means the predicate should end since the last verified piece was not a friend).
**/
getLinearFriends(Board, Piece, X, Y, Step, Direction, NumberFriends) :-
  getLinearFriends(Board, Piece, X, Y, Step, Direction, 0, 1, FinalCounter),
  NumberFriends = FinalCounter.

getLinearFriends(_, _, _, _, _, _, Counter, 0, FinalCounter) :-
  FinalCounter = Counter.
getLinearFriends(Board, Piece, X, Y, Step, Direction, Counter, 1, FinalCounter) :-
  isNextFriend(Board, Piece, X, Y, NextX, NextY, Step, Direction, Result),
  NextCounter is Result + Counter,
  getLinearFriends(Board, Piece, NextX, NextY, Step, Direction, NextCounter, Result, FinalCounter).


/**
  isCaptured/3: True if a soldier or a dux should be captured by the classic rules.
    Board, X, Y.
**/
isCaptured(Board, X, Y) :-
  isInCorner(X, Y),
  isSoldier(Board, X, Y),
  getEnemiesAround(Board, X, Y, Counter),
  Counter =:= 2.
isCaptured(Board, X, Y) :-
  isInBorder(X, Y),
  isSoldier(Board, X, Y),
  getEnemiesAround(Board, X, Y, Counter),
  Counter >= 2.
isCaptured(Board, X, Y) :-
  not(isInCorner(X, Y)),
  not(isInBorder(X, Y)),
  isSoldier(Board, X, Y),
  isBetweenEnemies(Board, X, Y).

isCaptured(Board, X, Y) :-
  isInCorner(X, Y),
  isDux(Board, X, Y),
  getBlockedPaths(Board, X, Y, Counter),
  Counter =:= 2.
isCaptured(Board, X, Y) :-
  isInBorder(X, Y),
  isDux(Board, X, Y),
  getBlockedPaths(Board, X, Y, Counter),
  Counter =:= 3.
isCaptured(Board, X, Y) :-
  not(isInCorner(X, Y)),
  not(isInBorder(X, Y)),
  isDux(Board, X, Y),
  getBlockedPaths(Board, X, Y, Counter),
  Counter =:= 4.


/**
  capturePushAndCrush/6: Captures the victim of a Push and Crush attack.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard.
**/
capturePushAndCrush(Board, Xi, Yi, Xf, Yf, NewBoard) :-
  isPushAndCrush(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY),
  capturePiece(Board, EnemyX, EnemyY, NewBoard).
capturePushAndCrush(Board, _, _, _, _, NewBoard) :-
  NewBoard = Board.


/**
  captureFlank/6: Captures the victim of a Flank attack.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard.
**/
captureFlank(Board, Xi, Yi, Xf, Yf, NewBoard) :-
  isFlank(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY),
  capturePiece(Board, EnemyX, EnemyY, NewBoard).
captureFlank(Board, _, _, _, _, NewBoard) :-
  NewBoard = Board.


/**
  capturePhalanx/6: Captures the victim of a Phalanx attack.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard.
**/
capturePhalanx(Board, Xi, Yi, Xf, Yf, NewBoard) :-
  isPhalanx(Board, Xi, Yi, Xf, Yf, EnemyX, EnemyY),
  capturePiece(Board, EnemyX, EnemyY, NewBoard).
capturePhalanx(Board, _, _, _, _, NewBoard) :-
  NewBoard = Board.


/**
  captureXXI/6: Captures pieces based on XXI rules.
    Board, Xi, Yi, Xf, Yf, ModifiedBoard.
**/
captureXXI(Board, Xi, Yi, Xf, Yf, CaptureBoard) :-
  capturePushAndCrush(Board, Xi, Yi, Xf, Yf, Board2),
  captureFlank(Board2, Xi, Yi, Xf, Yf, Board3),
  capturePhalanx(Board3, Xi, Yi, Xf, Yf, CaptureBoard).


/**
  captureClassic/6: Captures pieces based on classic rules in a specific step and direction.
    Board, Xf, Yf, Step, Direction, ModifiedBoard.
**/
captureClassic(Board, Xf, Yf, Step, Direction, FinalBoard) :-
  stepDirection(Xf, Yf, StepX, StepY, Step, Direction),
  isInsideBoard(StepX, StepY),
  isCaptured(Board, StepX, StepY),
  capturePiece(Board, StepX, StepY, FinalBoard).
captureClassic(Board, _, _, _, _, FinalBoard) :-
  FinalBoard = Board.


/**
  captureClassic/4: Captures pieces based on classic rules.
    Board, Xf, Yf, ModifiedBoard.
**/
captureClassic(Board, Xf, Yf, FinalBoard) :-
  captureClassic(Board, Xf, Yf, next, horizontal, Board2),
  captureClassic(Board2, Xf, Yf, before, horizontal, Board3),
  captureClassic(Board3, Xf, Yf, next, vertical, Board4),
  captureClassic(Board4, Xf, Yf, before, vertical, FinalBoard).


/**
  gameIsOver/2: True if the game is over.
    Board, Winner.
	Winner - 'Black' or 'White' indicating the player who won.
	A game is over if the dux dies or if there are no more soldiers of a team.

  gameIsOver/1: True if the game is over.
    Board.
**/
gameIsOver(Board, Winner) :-
  getBlackDux(Dux),
  not(findMatrixElement(Board, Dux)),
  Winner = '1',
  write('Winner: '), write(Winner), nl.
gameIsOver(Board, Winner) :-
  getWhiteDux(Dux),
  not(findMatrixElement(Board, Dux)),
  Winner = '2',
  write('Winner: '), write(Winner), nl.
gameIsOver(Board, Winner) :-
  getBlackSoldier(Soldier),
  not(findMatrixElement(Board, Soldier)),
  Winner = '1',
  write('Winner: '), write(Winner), nl.
gameIsOver(Board, Winner) :-
  getWhiteSoldier(Soldier),
  not(findMatrixElement(Board, Soldier)),
  Winner = '2',
  write('Winner: '), write(Winner), nl.
gameIsOver(Board, Winner) :-
  getAllMoves(Board, 1, M),
  length(M, Length),
  Length = 0,
  Winner = '2'.
gameIsOver(Board, Winner) :-
  getAllMoves(Board, 2, M),
  length(M, Length),
  Length = 0,
  Winner = '1'.

gameIsOver(Board) :- getBlackDux(Dux), not(findMatrixElement(Board, Dux)).
gameIsOver(Board) :- getWhiteDux(Dux), not(findMatrixElement(Board, Dux)).
gameIsOver(Board) :- getBlackSoldier(Soldier), not(findMatrixElement(Board, Soldier)).
gameIsOver(Board) :- getWhiteSoldier(Soldier), not(findMatrixElement(Board, Soldier)).
