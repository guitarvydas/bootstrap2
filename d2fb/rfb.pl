:- use_module(library(http/json)).

exec :-
    consult("tempfb.pl"),
    bagof([R,S,O],diagram_fact(R,S,O),Bag),
    json_write(user_output,Bag,[width(128)]).


