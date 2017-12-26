/**
  display.pl
 
  This file is responsible for the Console Display of the board.
**/


/**
  drawBoard/1: Draws a given board to the console.
    Board.
**/
drawBoard([Line | Remainder]) :-
  drawBoardHeader,
  drawBoardRest([Line | Remainder], 0), nl.


/**
  drawBoardHeader/0: Draws the header of the board.
**/
drawBoardHeader :- 
  write('       0     1     2     3     4     5     6     7'), nl,
  write('     _______________________________________________            1: o | 2: x'), nl.


/**
  drawBoardRest/2: Draws a board (except for the header) to the console.
    Board, LineNumber.
**/
drawBoardRest([], _).
drawBoardRest([Line | Remainder], LineNumber) :-
  drawUpSeparatorLine,
  write(LineNumber), write('   |'), drawValueLine(Line), nl,
  drawDownSeparatorLine,
  NextLineNumber is LineNumber + 1,
  drawBoardRest(Remainder, NextLineNumber).


/**
  drawValueLine/1: Draws a line of the board that displays the pieces.
    Line.
**/
drawValueLine([]).
drawValueLine([Cell | Remainder]) :-
	drawCell(Cell),
	drawValueLine(Remainder).


/**
  drawUpSeparatorLine/0: Draws the up separator of a line.
  drawDownSeparatorLine/0: Draws the down separator of a line.
**/
drawUpSeparatorLine :- write('    |     |     |     |     |     |     |     |     |'), nl.
drawDownSeparatorLine   :- write('    |_____|_____|_____|_____|_____|_____|_____|_____|'), nl.


/**
  drawCell/1: Writes a board atom to the console.
    Atom.
**/
drawCell('"black_soldier"') :- write('  x  |').
drawCell('"white_soldier"') :- write('  o  |').
drawCell('"black_dux"')     :- write('  X  |').
drawCell('"white_dux"')     :- write('  O  |').
drawCell('"empty_cell"')    :- write('     |').


/**
  clearScreen/0: Sends an ANSI code to clear the console.
**/
clearScreen :-  write('\33\[2J').


/**
  printMenu/0: Prints the main menu.
**/
printMenu :-
  clearScreen,
  write('--------------------------------'), nl,
  write('-        Latrunculi XXI        -'), nl,
  write('--------------------------------'), nl,
  write('-                              -'), nl,
  write('-   1. Player vs Player        -'), nl,
  write('-   2. Player vs Computer      -'), nl,
  write('-   3. Computer vs Computer    -'), nl,
  write('-   4. Exit                    -'), nl,
  write('-                              -'), nl,
  write('--------------------------------'), nl,
  write('Choose a game mode:'), nl.


/**
  printDifficultyMenu/0: Prints the difficulty menu.
**/
printDifficultyMenu :-
  clearScreen,
  write('--------------------------------'), nl,
  write('-        Latrunculi XXI        -'), nl,
  write('--------------------------------'), nl,
  write('-                              -'), nl,
  write('-   1. Dumb Bot                -'), nl,
  write('-   2. Intelligent Bot         -'), nl,
  write('-                              -'), nl,
  write('--------------------------------'), nl,
  write('Choose a bot difficulty:'), nl.
