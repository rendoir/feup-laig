/**
  tests.pl

  This file is responsible for unit testing some key features of the program.
**/


:- include('display.pl').
:- include('moves.pl').


test_board([
	[white_dux, black_soldier, white_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier, black_dux],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, black_soldier, empty_cell, empty_cell, empty_cell],
  [black_soldier, white_soldier, white_soldier, white_soldier, white_soldier, empty_cell, empty_cell, white_soldier]]).

test_board_2([
	[white_dux, black_soldier, black_soldier, black_soldier, empty_cell, black_soldier, black_soldier, black_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, black_dux, empty_cell, white_soldier, empty_cell, black_soldier, empty_cell, white_soldier],
	[empty_cell, white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
  [black_soldier, empty_cell, white_soldier, empty_cell, white_soldier, empty_cell, empty_cell, white_soldier]]).

test_board_3([
	[black_dux, black_soldier, empty_cell, black_soldier, black_soldier, black_soldier, black_soldier, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[black_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, white_dux, empty_cell, empty_cell, empty_cell],
	[black_dux, black_soldier, empty_cell, empty_cell, black_soldier, empty_cell, empty_cell, empty_cell],
	[white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
  [empty_cell, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, empty_cell]]).

test_board_4([
	[empty_cell, black_soldier, empty_cell, black_soldier, black_soldier, white_soldier, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, black_dux, empty_cell, empty_cell, empty_cell, black_soldier],
	[black_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier],
	[white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, white_dux, empty_cell, empty_cell, empty_cell, empty_cell],
  [empty_cell, white_soldier, black_soldier, white_soldier, white_soldier, black_soldier, white_soldier, white_soldier]]).

test_board_5([
	[empty_cell, black_soldier, empty_cell, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier],
	[empty_cell, white_soldier, empty_cell, black_dux, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, black_soldier, white_soldier, black_soldier, empty_cell, empty_cell, black_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, white_dux, empty_cell, empty_cell, empty_cell],
  [empty_cell, empty_cell, white_soldier, white_soldier, white_soldier, empty_cell, white_soldier, white_soldier]]).

test_board_6([
	[white_soldier, empty_cell, empty_cell, black_soldier, black_soldier, white_soldier, white_soldier, empty_cell],
	[white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[black_soldier, empty_cell, empty_cell, empty_cell, black_soldier, empty_cell, white_soldier, white_soldier],
	[black_dux, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[black_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell]]).

test_board_7([
	[black_soldier, empty_cell, empty_cell, black_dux, white_soldier, empty_cell, empty_cell, empty_cell],
	[black_dux, empty_cell, white_soldier, empty_cell, white_soldier, empty_cell, empty_cell, empty_cell],
	[white_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_dux],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[black_soldier, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[white_dux, empty_cell, empty_cell, white_soldier, black_soldier, empty_cell, empty_cell, empty_cell]]).

test_board_8([
	[black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier, black_soldier],
	[empty_cell, empty_cell, empty_cell, black_dux, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, white_dux, empty_cell, empty_cell, empty_cell],
  [white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier, white_soldier]]).

test_board_9([
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, black_soldier, empty_cell],
	[black_soldier, empty_cell, black_soldier, white_soldier, empty_cell, white_soldier, white_soldier, white_soldier],
	[empty_cell, black_soldier, black_soldier, black_soldier, empty_cell, white_soldier, empty_cell, white_soldier],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell],
	[empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, empty_cell, white_soldier, empty_cell]]).

testAll :-
  testDuxCaptureCorner,
  testSoldierCaptureCorner,
  testDuxCaptureBorder,
  testSoldierCaptureBorder,
  testDuxCaptureMid,
  testSoldierCaptureMid,
  testOrthogonal,
  testPiecesBetween,
  testImmobilizeFriendDux,
  testOffensiveDefensiveMove,
  testOffensiveDefensiveMove2,
  testLockedSoldier,
  testPushAndCrush,
  testFlank,
  testDuxMobility,
  testGameOver,
  testPhalanx.

testDuxCaptureCorner :-
  test_board(Board),
  drawBoard(Board),
  move(Board, 0, 7, 0, 1, FinalBoard),
  drawBoard(FinalBoard).

testSoldierCaptureCorner :-
  test_board(Board),
  drawBoard(Board),
  move(Board, 0, 0, 0, 6, FinalBoard),
  drawBoard(FinalBoard).

testDuxCaptureBorder:-
  test_board(Board),
  drawBoard(Board),
  move(Board, 7, 7, 7, 3, FinalBoard),
  drawBoard(FinalBoard).

testSoldierCaptureBorder :-
  test_board(Board),
  drawBoard(Board),
  move(Board, 6, 0, 6, 1, FinalBoard),
  drawBoard(FinalBoard).

testDuxCaptureMid :-
  test_board_2(Board),
  drawBoard(Board),
  move(Board, 0, 0, 0, 3, Board2),
  drawBoard(Board2),
  move(Board2, 2, 7, 2, 3, Board3),
  drawBoard(Board3).

testSoldierCaptureMid :-
  test_board_2(Board),
  drawBoard(Board),
  move(Board, 3, 3, 4, 3, Board2),
  drawBoard(Board2),
  move(Board2, 7, 3, 6, 3, Board3),
  drawBoard(Board3).

testOrthogonal :-
  test_board(Board),
  drawBoard(Board),
  not(move(Board, 0, 0, 1, 1, Board)).

testPiecesBetween :-
  test_board(Board),
  drawBoard(Board),
  not(move(Board, 3, 7, 3, 3, Board)).

testImmobilizeFriendDux :-
  test_board_3(Board),
  drawBoard(Board),
  not(move(Board, 0, 2, 0, 1, Board)),
  not(move(Board, 0, 2, 0, 3, Board)),
  move(Board, 3, 7, 3, 3, Board2),
  drawBoard(Board2),
  move(Board2, 5, 7, 5, 3, Board3),
  drawBoard(Board3),
  not(move(Board, 7, 2, 4, 2, Board)),
  move(Board3, 4, 0, 4, 2, Board4),
  drawBoard(Board4).

testOffensiveDefensiveMove :-
  test_board_3(Board),
  drawBoard(Board),
  moveIsOffensive(Board, 4, 0, 4, 2),
  move(Board, 4, 0, 4, 2, Board2),
  drawBoard(Board2),
  moveIsDefensive(Board2, 3, 0, 4, 0),
  move(Board2, 3, 0, 4, 0, Board3),
  drawBoard(Board3).

testOffensiveDefensiveMove2 :-
  test_board_2(Board),
  drawBoard(Board),
  moveIsDefensive(Board, 3, 3, 4, 3),
  move(Board, 3, 3, 4, 3, Board2),
  drawBoard(Board2),
  moveIsOffensive(Board2, 7, 3, 6, 3),
  move(Board2, 7, 3, 6, 3, Board3),
  drawBoard(Board3).

testLockedSoldier :-
  test_board_4(Board),
  drawBoard(Board),
  move(Board, 5, 7, 5, 1, Board2),
  drawBoard(Board2),
  not(move(Board2, 2, 7, 2, 0, Board2)),
  move(Board2, 2, 7, 2, 6, Board3),
  drawBoard(Board3),
  not(move(Board3, 0, 2, 5, 2, Board3)),
  move(Board3, 0, 2, 6, 2, Board4),
  drawBoard(Board4).

testPushAndCrush :-
  test_board_5(Board),
  drawBoard(Board),
  move(Board, 7, 4, 5, 4, Board2),
  drawBoard(Board2),
  move(Board2, 1, 3, 1, 2, Board3),
  drawBoard(Board3).

testFlank :-
  test_board_6(Board),
  drawBoard(Board),
  move(Board, 0, 0, 2, 0, Board2),
  drawBoard(Board2),
  move(Board2, 0, 1, 0, 3, Board3),
  drawBoard(Board3),
  move(Board3, 4, 4, 5, 4, Board4),
  drawBoard(Board4).

testDuxMobility :-
	test_board_7(Board),
  drawBoard(Board),
	not(move(Board, 0, 1, 1, 1, Board)),
  not(move(Board, 0, 7, 1, 7, Board)),
	not(move(Board, 3, 0, 3, 3, Board)),
	move(Board, 3, 0, 3, 1, Board2),
	drawBoard(Board2),
	move(Board2, 3, 1, 3, 6, Board3),
	drawBoard(Board3),
	move(Board3, 7, 3, 4, 3, Board4),
	drawBoard(Board4).

testGameOver :-
	test_board_8(Board),
	not(gameIsOver(Board, _)),
	drawBoard(Board),
	move(Board, 2, 7, 2, 1, Board2),
  drawBoard(Board2),
	move(Board2, 4, 6, 4, 1, Board3),
  drawBoard(Board3),
	move(Board3, 3, 7, 3, 2, Board4),
  drawBoard(Board4),
	gameIsOver(Board4, _).

testPhalanx :-
  test_board_9(Board),
  drawBoard(Board),
  move(Board, 0, 3, 1, 3, Board2),
  drawBoard(Board2),
  move(Board2, 6, 7, 6, 4, Board3),
  drawBoard(Board3).
