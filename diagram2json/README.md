# d2json

- bootstrap
  - begin with d2f.json (generated elsewhere)
  - json2js d2f.json -> 
  - write stubs for all Components (handlers)
	- uncompress (me, message)
	- diagramparser (me, message)
	- styleexpander (me, message)
	- asfactbase (me, message)
	- deletblanklines (me, message)
	- sortForPROLOG (me, message)
	- deleteTrailingSugar (me, message)
   - combine stubs + cos.js -> d2f.js
   - test
   - flesh out stubs 1 at a time

- problem:
  - compiled testbench.drawio -> testbench.json
  - but, diff says that new testbench.json is different from boot/das2json/testbench.json
	- observed: new testbench.js contains duplicate connections
	- theory: fb.pl is the same before final step
		- experiment: 
			- compare tempfb.pl with output from boot/das2json/
			- instrument boot/das2json to make a copy of fb.pl before json-ifying it
			- diff
			- results - very different sizes, why?
```
$ ls -l tempfb.pl 
-rw-r--r--  1 tarvydas  staff  29391 17 May 07:16 tempfb.pl
$ ls -l boot/das2json/tempfb-boot.pl 
-rw-r--r--  1 tarvydas  staff  143846 17 May 07:16 boot/das2json/tempfb-boot.pl
$ 
```
		- further data gathering
			- create probe-fbd2f.pl after d2f and probe-fbd2f-boot.pl
			- diff
		- further data gathering
			- not measuring the same results
		- further data gathering
			- diff probe-fbd2f.pl boot/das2json/probe-fbd2f-boot.pl
```
1d0
<            
449c448
< diagram_fact(y, cell_6, -785).
---
> diagram_fact(y, cell_6, -780).
451c450
< diagram_fact(y, cell_9, -650).
\ No newline at end of file
---
> diagram_fact(y, cell_9, -650).
$ 
```
			- output from d2f is slightly different from boot/das2json
				- -785 vs -780
				- No newline
			- theory: testbench.drawio is different in both cases
				- expt: re-copy testbench.drawio from boot/das2json and re-make
			- obs: 
				- fixed: `diagram_fact(y, cell_6, -780)`
				- not fixed: No newline
			- add + '\n' -- fixes No newline
			- obs: d2f files differ by 12 bytes
```
Files probe-fbd2f.pl and boot/das2json/probe-fbd2f-boot.pl differ
-rw-r--r--  1 tarvydas  staff  18002 17 May 08:47 boot/das2json/probe-fbd2f-boot.pl
-rw-r--r--  1 tarvydas  staff  18014 17 May 08:47 probe-fbd2f.pl
1d0
<            
     451    1381   18014 probe-fbd2f.pl
     450    1381   18002 boot/das2json/probe-fbd2f-boot.pl
     901    2762   36016 total
$ 
```
			- conclusion: funcs.js/sfdeleteblanklines leaves leading 12 spaces at front -> ignore for now

		- obs: now, tempfb's differ by ~1,000 bytes
		
		- expt: replace edgecontainment{1,2,3} with edgecontainment_new
		- result: testbench.json is the same as boot/das2json except for 1 newline
		
