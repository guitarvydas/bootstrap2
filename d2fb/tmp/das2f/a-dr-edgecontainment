#!/usr/bin/env swipl
:-initialization(designrule,main).
:- use_module(library(http/json)).
?- consult(fb).
?- consult("./shapes.pl").
?- consult("./onSameDiagram.pl").
?- consult("./inside.pl").
?- consult("./names.pl").
?- consult("./ports.pl").
?- consult("./contains.pl").


 
designrule:-
  (
  (
    das_fact(kind,Edge,edge),
    bagof([Passed,Edge,SourceContainer,TargetContainer],cond0(Passed,Edge,SourceContainer,TargetContainer),Bag)
  )
  ->true
  ; (Bag = [[true,true,true,true]]
  )
),
json_write(user_output,Bag,[width(128)]).

cond0(Passed,Edge,SourceContainer,TargetContainer):-
((diagram_fact(source,Edge,SourceLongID),
diagram_fact(synonym,SourceID,SourceLongID),
diagram_fact(target,Edge,TargetLongID),
diagram_fact(synonym,TargetID,TargetLongID),
das_fact(direct_contains,SourceContainer,SourceID),
das_fact(direct_contains,TargetContainer,TargetID),
(( das_fact(  direct_contains,Uber,TargetContainer  ),das_fact(  direct_contains,Uber,SourceContainer  ) );( das_fact(  direct_contains,SourceContainer,TargetContainer  ) );( das_fact(  direct_contains,TargetContainer,SourceContainer  ) );fail)
,
true)->Passed=true ; Passed=false).


