:- use_module(library(http/json)).
?- consult("fb.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/d2json/old/das2f/shapes.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/d2json/old/das2f/onSameDiagram.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/d2json/old/das2f/inside.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/d2json/old/das2f/names.pl").
?- consult("/Users/tarvydas/quicklisp/local-projects/d2json/old/das2f/ports.pl").
query:-
setof([A,B],das_fact(contains,A,B),All),
setof([C,D],das_fact(indirect_contains,C,D),Indirect),
subtract(All,Indirect,Set),
json_write(user_output,Set,[width(128)]).

