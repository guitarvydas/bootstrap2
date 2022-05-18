# note: ./das2f contains PROLOG queries for transpiling diagrams to factbases (incl. inferring async details about diagrams)

prep=./prep/prep
cwd=`pwd`
support=--support=${cwd}/support.js

all: clean queries main.js
#	node main.js d2f.drawio
#	./d2f d2f.drawio

#	./d2json d2f.drawio
	cp boot/das2json/testbench.drawio .
	./d2json testbench.drawio >testbench.json
	(cd boot/das2json ; make testbench.json)
	diff testbench.json boot/das2json/testbench.json

main: main.js
	node main.js d2f.drawio

#	${prep} '.' '$$' drawio.ohm drawio.glue --stop=1 ${support} <d2f.drawio

jslibs:
	npm install atob pako yargs ohm-js

d2f.json: ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json/helloworld.drawio
# create d2f.json from whatever is in ....helloworld.drawio
	(cd ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json ; make helloworld.json)
	cp ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json/helloworld.drawio ./d2f.drawio
	cp ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json/helloworld.json ./d2f.json
# copy d2f.json to das2json directory for converting .json->.js
	cp ./d2f.json ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json

d2f.js : d2f.json
	(cd ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json/json2js ; make d2f.js)
	cp ~/quicklisp/local-projects/bootstrap/d2fb/boot/das2json/json2js/d2f.js ./d2f.js

main.js: pre.js cos.js d2f.js funcs.js post.js parser.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >main.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >d2jsonmain.js

queries:
	(cd das2f ; make)
	(cd das2j ; make)

clean:
	rm -f d2f.json d2f.js main.js
	(cd das2f ; make clean)
	(cd boot/das2json ; make clean)
