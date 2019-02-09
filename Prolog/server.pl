:-use_module(library(socket)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

port(8081).

% Server Entry Point
server :-
	port(Port),
	tcp_socket(Socket),
    tcp_bind(Socket, Port),
    tcp_listen(Socket, 5),
    tcp_open_socket(Socket, _, _),
	write('Opened Server'),nl,nl,
	server_loop(Socket),
	tcp_close_socket(Socket),
	write('Closed Server'),nl.

% Server Loop 
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	tcp_accept(Socket, Slave, _Client),
	tcp_open_socket(Slave, StreamPair),
	stream_pair(StreamPair, Read, Write),
	% socket_server_accept(Socket, _Client, Stream, [type(text)]),
		write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Read, Request),
			read_header(Read)
		),_Exception,(
			write('Error parsing request.'),nl,
			close_stream(StreamPair),
			fail
		)),
		
		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Write, 'HTTP/1.0 ~p~n', [Status]),
		format(Write, 'Access-Control-Allow-Origin: *~n', []),
		format(Write, 'Content-Type: text/plain~n~n', []),
		format(Write, '~p', [MyReply]),
	
		write('Finnished Connection'),nl,nl,
		close_stream(StreamPair),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- parse_input(Request, MyReply), !.
handle_request(syntax_error, '{"msg": "Syntax Error"}', '400 Bad Request') :- !.
handle_request(_, '{"msg": "Bad Request"}', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line_to_codes(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line_to_codes(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Require your Prolog Files here
:- include('toAtom.pl').
:- include('game.pl').

parse_input(handshake, JsonReply) :-
	JsonReply = '{"msg": "handshake", "return": true}'.
parse_input(testConnection, JsonReply) :- 
	JsonReply = '{"msg": "Connection OK", "return": true}'.
parse_input(quit, JsonReply) :-
	JsonReply = '{"msg": "goodbye", "return": true}'.

% Game
parse_input(initialBoard, JsonReply) :-
	initialBoard(Board),
	toAtom(Board, BoardAtom),
	concat_list_atom(['{"msg": "InitialBoard", "return": true, "board": ', BoardAtom, '}'], JsonReply).

parse_input(gameIsOver(Board), JsonReply) :- 
	call_with_result(gameIsOver(Board, Winner), Result),
	toAtom(Winner, WinnerAtom),
	concat_list_atom(['{"msg": "gameIsOver", "return": ', Result, ', "winner": ', WinnerAtom, '}'], JsonReply).

parse_input(move(Turn, [Xi, Yi, Xf, Yf], Board), JsonReply) :-
	call_with_result(move(Turn, Board, Xi, Yi, Xf, Yf, FinalBoard), Result),
	toAtom(FinalBoard, BoardAtom),
	concat_list_atom(['{"msg": "move", "return": ', Result, ', "board": ', BoardAtom, '}'], JsonReply).

parse_input(getAllMoves(Turn, Board), JsonReply) :-
	call_with_result(getAllMoves(Board, Turn, MoveList), Result),
	toAtom(MoveList, MoveListAtom),
	concat_list_atom(['{"msg": "getAllMoves", "return": ', Result, ', "moves": ', MoveListAtom, '}'], JsonReply).

parse_input(makeMove(Player, Board, Difficulty), JsonReply) :-
	call_with_result(moveComputer(Board, Player, NewBoard, Difficulty, Move) ,Result),
	toAtom(NewBoard, NewBoardAtom),
	toAtom(Move, MoveAtom),
	concat_list_atom(['{"msg": "makeMove", "return": ', Result, ', "board": ', NewBoardAtom, ', "move": ', MoveAtom,'}'], JsonReply).