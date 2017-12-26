/**
  utilities.pl
  
  This file is responsible for all the tools a normal board game program would need.
**/


:- use_module(library(random)).
:- use_module(library(lists)).

/**
  getListElement/3: Gets the List Element at Index.
    Index, List, Element.
**/
getListElement(Index, List, Element):-
  nth0(Index, List, Element).


/**
  setListElement/4: Sets the List Element at Index.
    Index, NewElement,	InList, OutList.
**/
setListElement(0, Element, [_ | Tail], [Element | Tail]).
setListElement(Index, Element, [Head | Tail], [Head | NewTail]):-
  NewIndex is Index - 1,
  setListElement(NewIndex, Element, Tail, NewTail).


/**
  getMatrixElement/4: Gets the Matrix Element at the pair "Row and Column".
    Row, Column, Matrix, Element.
**/
getMatrixElement(ElementRow, ElementColumn, Matrix, Element):-
  nth0(ElementRow, Matrix, Row),
  nth0(ElementColumn, Row, Element).


/**
  getMatrixElement/5: Sets the Matrix Element at the pair "Row and Column".
    Row, Column, NewElement, InMatrix, OutMatrix.
**/
setMatrixElement(0, ElementColumn, NewElement, [OldRow|RemainingRows], [NewRow|RemainingRows]):-
  setListElement(ElementColumn, NewElement, OldRow, NewRow).
setMatrixElement(ElementRow, ElementColumn, NewElement, [Row|RemainingRows], [Row|ModifiedRemainingRows]):-
  isInsideBoard(ElementColumn, ElementRow),
  NextRow is ElementRow - 1,
  setMatrixElement(NextRow, ElementColumn, NewElement, RemainingRows, ModifiedRemainingRows).


/**
  findMatrixElement/2: Searches for an Element in a Matrix.
    Matrix, Element.
**/
findMatrixElement([Row|_], ElementToSearch) :-
  member(ElementToSearch, Row).
findMatrixElement([_|RemainingRows], ElementToSearch) :-
  findMatrixElement(RemainingRows, ElementToSearch).


/**
  stepNDirection/7: Steps a coordinate in a given Step and Direction for N times.
    X, Y, StepedX, StepedY, Step, Direction, NumberSteps.
**/
stepNDirection(X, Y, StepX, StepY, _, _, 0) :-
  StepX = X,
  StepY = Y.
stepNDirection(X, Y, StepX, StepY, Step, Direction, Number) :-
	Number > 0,
  stepDirection(X, Y, TempStepX, TempStepY, Step, Direction),
  NextNumber is Number - 1,
  stepNDirection(TempStepX, TempStepY, StepX, StepY, Step, Direction, NextNumber).


/**
  stepNDirection/6: Steps a coordinate in a given Step and Direction.
    X, Y, StepedX, StepedY, Step, Direction.
**/
stepDirection(X, Y, StepX, StepY, Step, horizontal) :-
	stepNumber(X, StepX, Step),
	StepY is Y.
stepDirection(X, Y, StepX, StepY, Step, vertical) :-
	stepNumber(Y, StepY, Step),
	StepX is X.


/**
  stepNumber/3: Steps a number in a given Step.
    InNumber, OutNumber, Step.
**/
stepNumber(Input, Output, next) :- Output is Input + 1.
stepNumber(Input, Output, before) :- Output is Input - 1.


/**
  nextStep/3: Steps a number towards another number.
    FromNumber, ToNumber, StepedNumber. 
**/
nextStep(I,F,N) :-
   I < F,
   N is I + 1.
nextStep(I,F,N) :-
   I > F,
   N is I - 1.


/**
  getDirection/5: Gets the direction formed by two coordinates.
    Xi, Yi, Xf, Yf, Direction.
**/
getDirection(Xi, _, Xf, _, Direction) :-
  Xi =:= Xf,
  Direction = vertical.
getDirection(_, Yi, _, Yf, Direction) :-
  Yi =:= Yf,
  Direction = horizontal.


/**
  getStep/6: Gets the step from a coordinate towards another.
    Xi, Yi, Xf, Yf, Step, Direction.
**/
getStep(Xi, _, Xf, _, Step, horizontal) :-
  Xf > Xi,
  Step = next.
getStep(Xi, _, Xf, _, Step, horizontal) :-
  Xf < Xi,
  Step = before.
getStep(_, Yi, _, Yf, Step, vertical) :-
  Yf > Yi,
  Step = next.
getStep(_, Yi, _, Yf, Step, vertical) :-
  Yf < Yi,
  Step = before.


/**
  getOppositeDirection/2: Gets the opposite direction of the input direction.
    Direction, OppositeDirection.
**/
getOppositeDirection(horizontal, OppositeDirection) :- OppositeDirection = vertical.
getOppositeDirection(vertical, OppositeDirection) :- OppositeDirection = horizontal.


/**
  getMaxPiecesAround/3: Calculates the maximum number of pieces that can be around a piece.
    X, Y, MaximumPieces.
**/
getMaxPiecesAround(X, Y, Max) :-
  isInCorner(X, Y),
  Max is 2.
getMaxPiecesAround(X, Y, Max) :-
  isInBorder(X, Y),
  Max is 3.
getMaxPiecesAround(_, _, Max) :-
  Max is 4.


/**
  not/1: True if the goal fails.
    Goal.
**/
not(Goal) :- Goal, !, fail.
not(_).


/**
  check/2: Checks if a goal is true. Never fails.
    Goal, Result.
	Result - (1 -> Goal is true, 0 -> Goal is false).
**/
check(Goal, Result) :- Goal, Result is 1.
check(_, Result) :- Result is 0.


/**
  abs/2: Get the absolute value of a number.
    Number, AbsoluteValue.
**/
abs(Number, Absolute) :-
  Number > 0,
  Absolute is Number.
abs(Number, Absolute) :-
  Absolute is Number * (-1).



/**
  readOption/3: Reads a menu option from the input buffer within a range.
    Option, MinimumOption, MaximumOption.
	To select an option you must enter it followed by a dot and finally press enter.
**/
readOption(Option, Minimum, Maximum) :-
  !,
	catch(read(Option), error(syntax_error(_),_), fail), 
  get_char(_),
	integer(Option),
	Option >= Minimum,
	Option =< Maximum, !.
readOption(_, _, _) :-
  write('Invalid Option!'), nl,
  fail.


/**
  readCoordinates/2: Reads a coordinate from the input buffer while checking for out of bounds.
    X, Y.
	To select each component of a coordinate you must enter it followed by a dot and finally press enter.
**/
readCoordinates(X, Y) :-
  repeat,
  (
    write('X?'),
	  catch(read(X), error(syntax_error(_),_), fail),
	  integer(X),
    !
  ),
  repeat,
  (
    write('Y?'),
    catch(read(Y), error(syntax_error(_),_), fail),
    integer(Y),
    !
  ),
	isInsideBoard(X, Y), !.
readCoordinates(_, _) :-
  write('Invalid Coordinates!'), nl,
  fail.


/**
  pressEnterToContinue/0: Waits for the user to press enter.
**/
pressEnterToContinue:-
  write('Press [Enter] to continue.'), nl,
  get_char(_).
		