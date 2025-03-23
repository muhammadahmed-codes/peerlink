-module(peer_execution).
-export([start_sender_process/1, start_receiver_process/0, send_task/1, receive_task/0, task/2]).

send_task(Receiver_Node) ->
    % message passing to the receiver node
    {receive_task, Receiver_Node} ! {task, self()},

    % waits for response from receiver node
    receive
        {result, Sum} ->
            io:format("Task executed!~nResult: ~p~n", [Sum])
    end.

receive_task() ->
    % waits for receiving a message from sender
    receive
        {task, Sender_Node} ->
            io:format("Received task from ~p~n", [Sender_Node]),
            Sum = task(3,5),
            % sends acknowledgement to the sender
            Sender_Node ! {result, Sum},
            receive_task()
    end.

% the task to send the recieving node
task(N1, N2) ->
    Sum = N1 + N2,
    % return Sum
    Sum.

start_sender_process(Receiver_Node) ->
    spawn(peer_execution, send_task, [Receiver_Node]).

start_receiver_process() ->
    register(receive_task, spawn(peer_execution, receive_task, [])), ok.
