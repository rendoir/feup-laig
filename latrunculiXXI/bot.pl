/**
  bot.pl

  This file is responsible for allowing a bot to pick a move from all the possible moves and apply it.
**/


:-include('moves.pl').


/**
  moveComputer/4: Gets all the possible moves, selects one based on bot difficulty and applies it.
    Board, PlayerNumber, ModifiedBoard, BotDifficulty.
**/
moveComputer(Board, Player, NewBoard, Difficulty) :-
  getAllMoves(Board, Player, MoveList),
  length(MoveList, L), format('  Generated ~d moves.', [L]), nl,
  pickMove(Difficulty, Board, MoveList, Move),
  applyComputerMove(Board, Move, NewBoard).


/**
  pickMove/4: Picks a move from the list of all the possible moves.
    BotDifficulty, Board, PossibleMoves, SelectedMove.
    BotDifficulty - Level of difficulty (1 -> dumb, 2 -> intelligent).
	PossibleMoves - The list of possible moves. Each move is a list of 4 elements [Xi, Yi, Xf, Yf].

	The 'dumb' bot selects a random piece from the list of possible moves.
	The 'intelligent' bot tries to make a move that ends the game. If it fails to do so, he tries to find an offensive mode. Lastly, if that also fails, it plays a random move.
**/
pickMove(1, _, MoveList, Move) :-
  length(MoveList, ListLength),
  random(0, ListLength, RandomIndex),
  getListElement(RandomIndex, MoveList, Move).
pickMove(2, Board, MoveList, Move) :-
  findGameOverMove(Board, MoveList, Move).
pickMove(2, Board, MoveList, Move) :-
  findOffensiveMove(Board, MoveList, Move).
pickMove(2, _, MoveList, Move) :-
  pickMove(1, _, MoveList, Move).


/**
  findGameOverMove/3: True if it finds a move that can end the game in the list of possible moves.
    Board, PossibleMoves, SelectedMove.
**/
findGameOverMove(Board, [HeadMove|_], Move) :- testGameOverMove(Board, HeadMove, Move).
findGameOverMove(Board, [_|RestMoves], Move) :- findGameOverMove(Board, RestMoves, Move).
testGameOverMove(Board, TestMove, Move) :-
  getListElement(0, TestMove, Xi),
  getListElement(1, TestMove, Yi),
  getListElement(2, TestMove, Xf),
  getListElement(3, TestMove, Yf),
  move(Board, Xi, Yi, Xf, Yf, NewBoard),
  gameIsOver(NewBoard),
  Move = TestMove.


/**
  findOffensiveMove/3: True if it finds an offensive move in the list of possible moves.
    Board, PossibleMoves, SelectedMove.
**/
findOffensiveMove(Board, [HeadMove|_], Move) :- testOffensiveMove(Board, HeadMove, Move).
findOffensiveMove(Board, [_|RestMoves], Move) :- findOffensiveMove(Board, RestMoves, Move).
testOffensiveMove(Board, TestMove, Move) :-
  getListElement(0, TestMove, Xi),
  getListElement(1, TestMove, Yi),
  getListElement(2, TestMove, Xf),
  getListElement(3, TestMove, Yf),
  moveIsOffensive(Board, Xi, Yi, Xf, Yf),
  Move = TestMove.


/**
  applyComputerMove/3: Applies a move to the board.
    Board, Move, ModifiedBoard.
**/
applyComputerMove(Board, Move, NewBoard) :-
  getListElement(0, Move, Xi),
  getListElement(1, Move, Yi),
  getListElement(2, Move, Xf),
  getListElement(3, Move, Yf),
  format('  Moving from (~d,~d) to (~d,~d).', [Xi, Yi, Xf, Yf]), nl,
  pressEnterToContinue,
  move(Board, Xi, Yi, Xf, Yf, NewBoard).


/**
  getAllMoves/3: Gets all the possible moves into a list.
    Board, PlayerNumber, PossibleMoveList.
**/
getAllMoves(Board, Player, MoveList) :-
  runThroughBoard(Board, Player, _, MoveList, -1).


/**
  runThroughBoard/5: Processes all the rows of the board.
    Board, PlayerNumber, TemporaryMoveList, PossibleMoveList, Row.
	Row - Index of the row or -1 if it is the first iteration (responsible for initializing the list).
**/
runThroughBoard(_, _, MoveList, FinalMoveList, Row) :- Row >= 8, FinalMoveList = MoveList.
runThroughBoard(Board, Player, MoveList, FinalMoveList, -1) :-
  MoveList = [],
  runThroughBoard(Board, Player, MoveList, FinalMoveList, 0).
runThroughBoard(Board, Player, MoveList, FinalMoveList, Row) :-
  runThroughRow(Board, Player, MoveList, FinalMoveListRow, Row, 0),
  NextRow is Row + 1,
  runThroughBoard(Board, Player, FinalMoveListRow, FinalMoveList, NextRow).


/**
  runThroughRow/6: Processes a row, processing all the pieces.
    Board, PlayerNumber, TemporaryMoveList, PossibleMoveList, Row, Column.
	TemporaryMoveList - Unified to [] by runThroughBoard/5.
	PossibleMoveList - Final list (not unified until stop condition).
**/
runThroughRow(_, _, MoveList, FinalMoveListRow, _, Column) :- Column >= 8, FinalMoveListRow = MoveList.
runThroughRow(Board, Player, MoveList, FinalMoveListRow, Row, Column) :-
  getPieceMoveList(Board, Player, Row, Column, PieceMoves),
  append(MoveList, PieceMoves, NewMoveList),
  NextColumn is Column + 1,
  runThroughRow(Board, Player, NewMoveList, FinalMoveListRow, Row, NextColumn).


/**
  getPieceMoveList/5: Processes a piece, trying to move each in all directions and steps and, when possible, appending them to the list.
    Board, PlayerNumber, Row, Column, PossiblePieceMoves.
	
  getPieceMoveList/7: Checks all the moves possible in the specified direction and step.
	Board, PlayerNumber, Row, Column, Step, Direction, PossiblePieceMoves.

  getPieceMoveList/12:
    Board, PlayerNumber, Row, Column, LastCheckedX, LastCheckedY, Step, Direction, TemporaryMoveList, PossiblePieceMoves, NextNumberSteps, Result.
    LastCheckedX, LastCheckedY - Last checked coordinates to move to.
	TemporaryMoveList - Unified to [] in the first iteration (When it is called with Result unified to -1),
    PossiblePieceMoves - Final list (not unified until stop condition),
    NextNumberSteps - Number of squares visited in the current step and direction,
    Result - Result of the last move checked (-1 -> first iteration, 0 -> last move failed, 1 -> last move succeeded).

	The result works as a way of the predicate not failing, making it always true. However it works differently based on it.
	  Result = 0 means the last move was invalid and therefore should not be added to the list.
	  Result = 1 means the last move was valid and therefore should be added to the list.
	  Result = -1 means it is the first iteration, useful to initialize the TemporaryMoveList.	
**/
getPieceMoveList(Board, Player, Row, Column, PieceMoves) :-
  getPieceMoveList(Board, Player, Row, Column, next, horizontal, PieceMoves1),
  getPieceMoveList(Board, Player, Row, Column, before, horizontal, PieceMoves2),
  getPieceMoveList(Board, Player, Row, Column, next, vertical, PieceMoves3),
  getPieceMoveList(Board, Player, Row, Column, before, vertical, PieceMoves4),
  append(PieceMoves1, PieceMoves2, PieceMovesTmp),
  append(PieceMovesTmp, PieceMoves3, PieceMovesTmp2),
  append(PieceMovesTmp2, PieceMoves4, PieceMoves).

getPieceMoveList(Board, Player, Y, X, Step, Direction, PieceMoves) :-
   getPieceMoveList(Board, Player, Y, X, _, _, Step, Direction, _, PieceMoves, 1, -1).

getPieceMoveList(_, _, _, _, _, _, _, _, TmpMoves, FinalMoves, NumberSteps, _) :- NumberSteps >= 8, FinalMoves = TmpMoves.
getPieceMoveList(Board, Player, Y, X, StepX, StepY, Step, Direction, PieceMoves, FinalMoves, NumberSteps, 0) :-
  stepDirection(StepX, StepY, CheckX, CheckY, Step, Direction),
  check(move(Player, Board, X, Y, CheckX, CheckY, _), Result),
  NextNumberSteps is NumberSteps + 1,
  getPieceMoveList(Board, Player, Y, X, CheckX, CheckY, Step, Direction, PieceMoves, FinalMoves, NextNumberSteps, Result).
getPieceMoveList(Board, Player, Y, X, _, _, Step, Direction, PieceMoves, FinalMoves, NumberSteps, -1) :-
  PieceMoves = [],
  stepDirection(X, Y, CheckX, CheckY, Step, Direction),
  check(move(Player, Board, X, Y, CheckX, CheckY, _), Result),
  NextNumberSteps is NumberSteps + 1,
  getPieceMoveList(Board, Player, Y, X, CheckX, CheckY, Step, Direction, PieceMoves, FinalMoves, NextNumberSteps, Result).
getPieceMoveList(Board, Player, Y, X, StepX, StepY, Step, Direction, PieceMoves, FinalMoves, NumberSteps, 1) :-
  append(PieceMoves, [[X, Y, StepX, StepY]], NewPieceMoves),
  stepDirection(StepX, StepY, CheckX, CheckY, Step, Direction),
  check(move(Player, Board, X, Y, CheckX, CheckY, _), Result),
  NextNumberSteps is NumberSteps + 1,
  getPieceMoveList(Board, Player, Y, X, CheckX, CheckY, Step, Direction, NewPieceMoves, FinalMoves, NextNumberSteps, Result).
