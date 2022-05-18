NODEMODULES=\
	node_modules/ohm-js \
	node_modules/yargs \
	node_modules/atob \
	node_modules/pako

# change this for your own environment
TOOLS=.

all: $(NODEMODULES) tools helloworld.json

node_modules/ohm-js:
	npm install ohm-js
node_modules/yargs:
	npm install yargs
node_modules/atob:
	npm install atob
node_modules/pako:
	npm install pako

tools:
	(cd ./dr ; make)
	(cd ./prep ; make)
	(cd ./d2f ; make)
	(cd ./das2f ; make)
	(cd ./das2j ; make)

helloworld.json : tools helloworld.drawio
	./generate.bash $(TOOLS) helloworld.drawio

clean:
	(cd ./dr ; make clean)
	(cd ./prep ; make clean)
	(cd ./d2f ; make clean)
	(cd ./das2f ; make clean)
	(cd ./das2j ; make clean)
	rm -f layer*
	rm -f preprocessed*
	rm -f duct?_*
	rm -f out.json
	rm -rf _*
	rm -f *~

npmstuff: node_modules/ohm-js node_modules/yargs node_modules/yargs-parser node_modules/atob node_modules/pako
	npm install ohm-js yargs atob pako

