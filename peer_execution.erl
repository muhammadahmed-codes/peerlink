-module(peer_execution).
-export([start/0, display_message/2]).

display_message(Message, To) ->
    io:format("~s~n", [Message]),
    io:format("~s~n", [To]).

start() ->
    spawn(peer_execution, display_message, ["Hello", "Ahmed"] end).
