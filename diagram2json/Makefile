prep=./prep/prep
cwd=`pwd`
support=--support=${cwd}/support.js

all: clean main.js testbench.json testbench.js
	@echo Now, load 'hamburgerworkbench0d/hamburger0d.html' into a browser

testbench.json:
	./d2json testbench.drawio >testbench.json

testbench.js: testbench.json
	(cd json2js ; make dev)
	cp json2js/testbench.js .

main: main.js
	node main.js d2f.drawio

jslibs:
	npm install atob pako yargs ohm-js

main.js: pre.js cos.js d2f.js funcs.js post.js parser.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >main.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >d2jsonmain.js

clean:
	rm -f main.js
	rm -f testbench.json 
	rm -f testbench.js
