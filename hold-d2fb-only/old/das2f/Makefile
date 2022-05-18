QUERIES=\
layer4_query.bash \
layer5_query.bash \
layer6_query.bash \
layerallcontains_query.bash \
layerboundingbox_query.bash \
layercolor_query.bash \
layerconnection_query.bash \
layerdirection_query.bash \
layeredgecontainment1_query.bash \
layeredgecontainment2_query.bash \
layeredgecontainment3_query.bash \
layerkind_query.bash \
layername_query.bash \
layersynccode_query.bash


all: firsttime


firsttime: build

build: $(QUERIES)

$(QUERIES) :
	./build.bash ..

clean:
	rm -f layer*.bash
	rm -f preprocessed*
	rm -f a-dr-edgecontainment
	rm -f b-dr-edgecontainment
	rm -f out.json
	rm -f view*.bash view*.pl view*.js

