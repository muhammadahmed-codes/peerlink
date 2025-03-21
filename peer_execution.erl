-module(peer_execution).
-export([start_sender_process/1, start_receiver_process/0, send_task/1, receive_task/0, task/0]).

send_task(Receiver_Node) ->
    % message passing to the receiver node
    {receive_task, Receiver_Node} ! {task, self()},

    % waits for response from receiver node
    receive
        task ->
            io:format("Task executed!")
    end.

receive_task() ->
    % waits for receiving a message from sender
    receive
        {task, Sender_Node} ->
            io:format("Received task from ~p~n", [Sender_Node]),

            % sends acknowledgement to the sender
            Sender_Node ! task,
            task()
    end.

% the task to send the recieving node
task() ->
    io:format("Task completed!").

start_sender_process(Receiver_Node) ->
    spawn(peer_execution, send_task, [Receiver_Node]).

start_receiver_process() ->
    register(receive_task, spawn(peer_execution, receive_task, [])), ok.
