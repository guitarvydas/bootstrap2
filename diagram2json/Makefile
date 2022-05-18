prep=./prep/prep
cwd=`pwd`
support=--support=${cwd}/support.js

all: clean main.js
	./d2json testbench.drawio >testbench.json

main: main.js
	node main.js d2f.drawio

jslibs:
	npm install atob pako yargs ohm-js

main.js: pre.js cos.js d2f.js funcs.js post.js parser.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >main.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >d2jsonmain.js

clean:
	rm -f main.js
