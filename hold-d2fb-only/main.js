var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako
var fs   = require ('fs');
// COS
// Component Operating System


// messages

function InputMessage (etag, v, who, target, tracer) {
    this.etag = etag;
    this.data = v;
    this.tracer = tracer;
    this.comefrom = who;
    this.target = target;
    this.kind = "i";
    this.toString = function () { return recursiveToString (this); }
}

function OutputMessage (etag, v, who, target, tracer) {
    this.etag = etag;
    this.data = v;
    this.tracer = tracer;
    this.comefrom = who;
    this.target = target;
    this.kind = "o";
    this.toString = function () { return recursiveToString (this); }
}

function recursiveToString (m) {
    if (m) {
        return `(${m.comefrom}->${m.target}::[${m.kind}]${m.etag}:${m.data.toString ()}:${recursiveToString (m.tracer)})`;
    } else {
        return '.';
    }
}

// queue

function Queue () {
    this.queue = [];
    this.empty = function () { return (0 === this.queue.length) };
    this.enqueue = function (item) { this.queue.unshift (item); };
    this.dequeue = function () { return this.queue.pop (); };
    this.forEach = function (f) { return this.queue.forEach (f); };
    this.length = function () { return this.queue.length; };
    this.toArray = function () { return this.queue; }
}

/// routing

function route () {
    var _me = this;
    var _ret = null;

    _me.children.forEach (child => {
        child.runnable.outputQueue.forEach (output_message => {
            var message = output_message;
            var connection = this.find_connection_in__me (this, child, message.etag);
            if (connection) {
                connection.receivers.forEach (dest => {
                    var params = [_me, dest, message];
                    if ((dest.name !== "_me")) {
                        deliver_to_child_input (params);
                    } else if ((dest.name === "_me")) {
                        deliver_to_me_output (params);
                    }
                });
            } else {
            };
        });
        child.runnable.resetOutputQueue ();
    });
    return _ret;
}

deliver_to_child_input = function ([_me, dest, message]) {
    var receiver = _me.lookupChild (dest.name);
    var input_message = new InputMessage (dest.etag, message.data,message.comefrom,receiver.name,message);
    receiver.enqueueInput (input_message);
}

deliver_to_me_output = function ([_me, dest, message]) {
    var output_message = new OutputMessage (dest.etag, message.data,message.comefrom,_me.name,message);
    _me.enqueueOutput (output_message);
}


/// step


Try_component = function () {
    var _ret = undefined;
    var lambdas = {
        main: function (_me, _label) {
            if (_label === 0) {
                if (!_me.has_children ()) {
                    return lambdas.try_self (_me, 1);
                } else {

                    _me.memo_readiness_of_each_child ();
                    _me.step_each_child ();
                    if (!_me.any_child_was_previously_ready ()) {
                        return lambdas.try_self (_me, 2);
                    } else {

                        return lambdas.activated (_me, 0);

                        ;}



                    ;}

            } else {
                _me.panic ("main", _label); 
            }
        },
        try_self: function (_me, _label) {
            if (_label === 0) {
                return lambdas.try_self (_me, 1);
            } else if (_label === 1) {

                return lambdas.try_self (_me, 2);
            } else if (_label === 2) {
                if (!_me.self_has_input ()) {
                    return lambdas.not_activated (_me, 3);
                } else {

                    _me.self_first_step_with_input ();
                    return lambdas.activated (_me, 0);


                    ;}


            } else {
                _me.panic ("try_self", _label); 
            }
        },
        not_activated: function (_me, _label) {
            if (_label === 0) {
                return lambdas.not_activated (_me, 3);
            } else if (_label === 3) {
                return lambdas.finished (_me, 0);


            } else {
                _me.panic ("not_activated", _label); 
            }
        },
        activated: function (_me, _label) {
            if (_label === 0) {
                return lambdas.finished (_me, 0);

            } else {
                _me.panic ("activated", _label); 
            }
        },
        finished: function (_me, _label) {
            if (_label === 0) {
                return _ret;

            } else {
                _me.panic ("finished", _label); 
            }
        },
        _endoflambdas: null
    };
    return (function (_me) { return lambdas.main (_me, 0); });
}


// find_connection

function find_connection (_me, etag) {
    var _ret =  null;
    
    _me.connections.forEach (connection => {
        var sender = connection.sender;
        
        if ((sender.name === "_me") && (sender.etag === etag)) {
            
            _ret = connection;
        }
    });
    return  _ret;
}

// find_connection__in_me

function find_connection_in__me (_me, childname, etag) {
    var _ret =  null;
    
    _me.connections.forEach (connection => {
        var sender = connection.sender;
        
        if ((sender.name === childname) && (sender.etag === etag)) {
            
            _ret = connection;
        }
    });
    return  _ret;
}

// handling for Containers

deliverInputMessageToAllChildrenOfSelf = function (_me, message) {
    var _ret =  null;

    var connection = _me.find_connection (_me, message.etag);
    if (connection) {

        connection.receivers.forEach (dest => {
            var params = [_me, message, dest];
            if ((dest.name !== "_me")) {
                _me.deliver_input_from_container_input_to_child_input (params);
            } else if ((dest.name === "_me")) {
                _me.deliver_input_from_container_input_to_me_output (params);
            }
        });
    } else {
    }
    return  _ret;
}

// message delivery for Containers

function deliver_input_from_container_input_to_child_input (params) {
    var _me = params[0];
    var message = params[1];
    var dest = params[2];

    var destname = dest.name;
    var receiverrunnable = this.lookupChild (destname);
    
    var newm = new InputMessage (dest.etag, message.data, _me.name, receiverrunnable.name, message);
    receiverrunnable.enqueueInput (newm);
}
function deliver_input_from_container_input_to_me_output (params) {
    var _me = params[0];
    var message = params[1];
    var dest = params[2];
    
    var destname = dest.name;
    var receiverrunnable = this.lookupChild (destname);

    var newm = new OutputMessage (dest.etag, message.data, _me.name, receiverrunnable.name, message);
    receiverrunnable.enqueueOutput (newm);
}

// runnable (instances of components)

function send (etag, v, tracer) {
    let m = new OutputMessage (etag, v, this.name, "?", tracer); // Send knows who the sender is, but doesn't yet know who the receiver is
    this.outputQueue.enqueue (m);
}

function inject (etag, v, tracer) {
    let m = new InputMessage (etag, v, ".", undefined);
    this.inputQueue.enqueue (m);
}


function Runnable (signature, protoImplementation, container, instancename) {
    if (instancename) {
        this.name = instancename;
    } else {
        this.name = signature.name;
    }
    this.signature = signature;
    this.protoImplementation = protoImplementation;
    this.container = container;
    this.inputQueue = new Queue ();
    this.outputQueue = new Queue ();
    this.outputs = function () { return this.outputQueue.toArray (); };
    this.send = send;
    this.inject = inject;
    this.handler = function (me, message) {
        protoImplementation.handler (me, message);
    };
    this.hasOutputs = function () {return !this.outputQueue.empty ()};
    this.hasInputs = function () {return !this.inputQueue.empty ()};
    this.has_children = function () {return (0 < this.children.length); };
    this.dequeueOutput = function () {return this.outputQueue.dequeue ();};
    this.enqueueInput = function (m) { m.target = this.name; this.inputQueue.enqueue (m); };
    this.enqueueOutput = function (m) { m.target = this.name; this.outputQueue.enqueue (m); };
    this.begin = function () {};
    this.finish = function () {};
    this.resetOutputQueue = function () {
        this.outputQueue = new Queue ();
    }
    this.errorUnhandledMessage = function (message) {
        console.error (`unhandled message in ${this.name} ${message.tag}`);
        //process.exit (1);
        throw 'error exit';
    };
    if (container) {
        this.conclude = container.conclude;
    }
    this.memoPreviousReadiness = function () { this._previouslyReady = this.hasInputs (); };
    this.testPreviousReadiness = function () { return this._previouslyReady; };
    this.ready = this.hasInputs;
    this.busy = function () {return false};
    this.panic = function () { throw "panic"; }
}

function Leaf (signature, protoImplementation, container, name) {
    let me = new Runnable (signature, protoImplementation, container, name);
    me.route = function () { };
    me.children = [];
    me.connections = [];
    me.step = function () {
        if (! this.inputQueue.empty ()) {
            let m = this.inputQueue.dequeue ();
            this.handler (this, m);
        }
    };
    me._previouslyReady = false;
    return me;
}

function Container (signature, protoImplementation, container, instancename) {
    let me = new Runnable (signature, protoImplementation, container, instancename);
    me.route = route;
    me.step = function () {
        // Container tries to step all children,
        // if no child was busy, then Container looks at its own input
        // (logic written in step.drawio -> step.drakon -> step.js ; step returns
        //  a stepper function, which must be called with this)
        var stepperFunction = Try_component ();
        stepperFunction (this);
    },
    me.self_first_step_with_input = function () {
        if (! this.inputQueue.empty ()) {
            let m = this.inputQueue.dequeue ();
            this.handler (this, m);
        }
    },
    me.memo_readiness_of_each_child = function () {
        this.children.forEach (childobject => {
            childobject.runnable.memoPreviousReadiness ();
        });
    };
    me.any_child_was_previously_ready = function () {
        return this.children.some (childobject => {
            return childobject.runnable.testPreviousReadiness ();
        });
    };
    me.step_each_child = function () {
        this.children.forEach (childobject => {
            childobject.runnable.step ();
            childobject.runnable.route ();
        });
    };

    me.any_child_is_busy = function () {
        return this.children.some (childobject => {
            var ready = childobject.runnable.ready ();
            var busy = childobject.runnable.busy ();
            return (ready || busy);
        });
    }
    
    me.self_has_input = me.hasInputs;
    me.ready = me.hasInputs;
    me.busy = me.any_child_is_busy;
    me.hasWorkToDo = function () {
        var ready = this.ready ();
        var busy = this.busy ();
        return (ready || busy);
    };

    me.find_connection = find_connection;
    me.find_connection_in__me = function (_me, child, etag) {
        return find_connection_in__me (this, child.name, etag);
    };
    me.lookupChild = function (name) {
        var _ret = null;
        this.children.forEach (childobj => {
            if (childobj.name === name) {
                _ret = childobj.runnable;
            }
        });
        if (_ret === null) {
            console.error (`child '${name}' not found in '${this.name}'`);
            //process.exit (1);
            throw 'error exit';
        };
        return _ret;
    }
    if (protoImplementation.begin) {
            me.begin = protoImplementation.begin;
    }
    if (protoImplementation.finish) {
        me.finish = protoImplementation.finish;
    }
    me._done = false;
    me.conclude = function () { 
        this.container._done = true; 
    };
    me.done = function () {return this._done;};
    me.resetdone = function () {this._done = false;}
    me.wakeup = function () {
        if (this.container) {
            this.route ();
            this.container.wakeup (); // keep punting upwards until at top
        } else {
            this.resetdone ();
            this.route ();
            while ( (!this.done ()) && this.hasWorkToDo () ) {
                this.step ();
                this.route ();
            }
        }
    }

    return me;
}



var diagramparser_signature = {
    name: "diagramparser",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var diagramparser_protoImplementation = {
    name: "diagramparser",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdiagramparser (message.data);
me.send ("out", x, message);


    }
}

function diagramparser (container, instancename) {
    let me = new Leaf (diagramparser_signature, diagramparser_protoImplementation, container, instancename);
    return me;
}



var asfactbase_signature = {
    name: "asfactbase",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var asfactbase_protoImplementation = {
    name: "asfactbase",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfasfactbase (message.data);
me.send ("out", x, message);


    }
}

function asfactbase (container, instancename) {
    let me = new Leaf (asfactbase_signature, asfactbase_protoImplementation, container, instancename);
    return me;
}



var deleteblanklines_signature = {
    name: "deleteblanklines",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var deleteblanklines_protoImplementation = {
    name: "deleteblanklines",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdeleteblanklines (message.data);
me.send ("out", x, message);


    }
}

function deleteblanklines (container, instancename) {
    let me = new Leaf (deleteblanklines_signature, deleteblanklines_protoImplementation, container, instancename);
    return me;
}



var sortForPROLOG_signature = {
    name: "sortForPROLOG",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var sortForPROLOG_protoImplementation = {
    name: "sortForPROLOG",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfsortForPROLOG (message.data);
me.send ("out", x, message);


    }
}

function sortForPROLOG (container, instancename) {
    let me = new Leaf (sortForPROLOG_signature, sortForPROLOG_protoImplementation, container, instancename);
    return me;
}



var deleteTrailingSugar_signature = {
    name: "deleteTrailingSugar",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var deleteTrailingSugar_protoImplementation = {
    name: "deleteTrailingSugar",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdeleteTrailingSugar (message.data);
me.send ("out", x, message);


    }
}

function deleteTrailingSugar (container, instancename) {
    let me = new Leaf (deleteTrailingSugar_signature, deleteTrailingSugar_protoImplementation, container, instancename);
    return me;
}



var kickStart_signature = {
    name: "kickStart",
    inputs: [],
    outputs: [{name:"out", structure:["out"]}]
}


var kickStart_protoImplementation = {
    name: "kickStart",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var rawbinary = sfreadfile (argv._[0]);
me.send ("out", rawbinary, null);


    }
}

function kickStart (container, instancename) {
    let me = new Leaf (kickStart_signature, kickStart_protoImplementation, container, instancename);
    return me;
}



var finish_signature = {
    name: "finish",
    inputs: [{name:"in", structure:["in"]}],
    outputs: []
}


var finish_protoImplementation = {
    name: "finish",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log (message.data);


    }
}

function finish (container, instancename) {
    let me = new Leaf (finish_signature, finish_protoImplementation, container, instancename);
    return me;
}



var bootstrap_signature = {
    name: "bootstrap",
    inputs: [],
    outputs: []
}



function bootstrap_makechildren (container) {
      var child1 = new diagramparser (container, "diagramparser");
        var child2 = new asfactbase (container, "asfactbase");
        var child3 = new deleteblanklines (container, "deleteblanklines");
        var child4 = new sortForPROLOG (container, "sortForPROLOG");
        var child5 = new deleteTrailingSugar (container, "deleteTrailingSugar");
        var child6 = new kickStart (container, "kickStart");
        var child7 = new finish (container, "finish");
        var child8 = new styleexpander (container, "styleexpander");
        var child9 = new uncompress (container, "uncompress");
      var children = [ {name: "diagramparser", runnable: child1}, {name: "asfactbase", runnable: child2}, {name: "deleteblanklines", runnable: child3}, {name: "sortForPROLOG", runnable: child4}, {name: "deleteTrailingSugar", runnable: child5}, {name: "kickStart", runnable: child6}, {name: "finish", runnable: child7}, {name: "styleexpander", runnable: child8}, {name: "uncompress", runnable: child9} ];
      return children;
}

function bootstrap_makeconnections (container) {
    var conn10 = {sender:{name: "uncompress", etag: "out"}, net: "NIY", receivers:  [{name: "diagramparser", etag: "in"}] };
    var conn11 = {sender:{name: "diagramparser", etag: "out"}, net: "NIY", receivers:  [{name: "styleexpander", etag: "in"}] };
    var conn12 = {sender:{name: "styleexpander", etag: "out"}, net: "NIY", receivers:  [{name: "asfactbase", etag: "in"}] };
    var conn13 = {sender:{name: "asfactbase", etag: "out"}, net: "NIY", receivers:  [{name: "deleteblanklines", etag: "in"}] };
    var conn14 = {sender:{name: "deleteblanklines", etag: "out"}, net: "NIY", receivers:  [{name: "sortForPROLOG", etag: "in"}] };
    var conn15 = {sender:{name: "sortForPROLOG", etag: "out"}, net: "NIY", receivers:  [{name: "deleteTrailingSugar", etag: "in"}] };
    var conn16 = {sender:{name: "kickStart", etag: "out"}, net: "NIY", receivers:  [{name: "uncompress", etag: "in"}] };
    var conn17 = {sender:{name: "deleteTrailingSugar", etag: "out"}, net: "NIY", receivers:  [{name: "finish", etag: "in"}] };
    var connections = [ conn10, conn11, conn12, conn13, conn14, conn15, conn16, conn17 ];
    return connections;
}

function bootstrap_makenets (container) {
    return [];
}

var bootstrap_protoImplementation = {
    name: "bootstrap",
    kind: "container",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
}

function bootstrap (container, instancename) {
    let me = new Container (bootstrap_signature, bootstrap_protoImplementation, container, instancename);
    me.children = bootstrap_makechildren (me);
    me.connections = bootstrap_makeconnections (me);
    me.nets =  bootstrap_makenets (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    return me;
}



var styleexpander_signature = {
    name: "styleexpander",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var styleexpander_protoImplementation = {
    name: "styleexpander",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfstyleexpander (message.data);
me.send ("out", x, message);


    }
}

function styleexpander (container, instancename) {
    let me = new Leaf (styleexpander_signature, styleexpander_protoImplementation, container, instancename);
    return me;
}



var uncompress_signature = {
    name: "uncompress",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var uncompress_protoImplementation = {
    name: "uncompress",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var u = sfuncompress (message.data);
me.send ("out", u, message);


    }
}

function uncompress (container, instancename) {
    let me = new Leaf (uncompress_signature, uncompress_protoImplementation, container, instancename);
    return me;
}



function sfdiagramparser (xml) {
    console.log ('sfdiagramparser');
//     | $prep '.' '$' $d2fdir/diagram.ohm $d2fdir/diagram.glue --stop=1 --support=$d2fdir/support.js \
    var rxml = prep (xml, 'diagram.ohm', 'diagram.glue', './support.js', 1);
    return rxml;
}

function sfasfactbase (xml1) {
    console.log ('sfasfactbase');
//     | $prep '.' '$' $d2fdir/factbase.ohm $d2fdir/factbase.glue --stop=1 --support=$d2fdir/support.js \
    var fb = prep (xml1, 'factbase.ohm', 'factbase.glue', './support.js', 1);
    return fb;
}

function sfdeleteblanklines (text) {
    console.log ('sfdeleteblanklines');
    var rtext = text.replace(/(^[ \t]*\n)/gm, "");
    return rtext;
}

function sfsortForPROLOG (text) {
    console.log ('sfsortForPROLOG');
    var sarray = text.split ('\n');
    var sorted = sarray.sort ();
    var str = sorted.join ('\n');
    return str;
}

function sfdeleteTrailingSugar (text) {
    console.log ('sfdeleteTrailingSugar');
    var sarray = text.split ('\n');
    sarray.forEach (s => s.trim ());
    var str = sarray.join ('\n');
    return str;
}

function sfstyleexpander (xml) {
    console.log ('sfstyleexpander');
// | $prep '.' '$' $d2fdir/styleexpander.ohm $d2fdir/styleexpander.glue --stop=1 --support=$d2fdir/support.js \
    var rxml = prep (xml, 'styleexpander.ohm', 'styleexpander.glue', './support.js', 1);
    return rxml;
}

function sfuncompress (rawdrawio) {
// $prep '.' '$' $d2fdir/drawio.ohm $d2fdir/drawio.glue --stop=1 --support=$d2fdir/support.js <$name
    console.log ('sfuncompress');
    var str = prep (rawdrawio, 'drawio.ohm', 'drawio.glue', './support.js', 1);
    return str;
}

function sfreadfile (fname) {
    console.log ('sfreadfile');
    var bytes = fs.readFileSync (fname, 'utf-8');
    return bytes;
}
//'use strict'


var argv;

var reTrigger;
var reEnd;
var stop;
var cycles = 0;

var viewGeneratedCode = false;
var tracing = false;
var traceDepth;

var ohm = require ('ohm-js');
var support;
var fmt;

const glueGrammar =
      String.raw`
SemanticsSCL {
  semantics = ws* semanticsStatement+
  semanticsStatement = ruleName ws* "[" ws* parameters "]" ws* "=" ws* code? rewrites ws*

  ruleName = letter1 letterRest*
  
  parameters = parameter*
  parameter = treeparameter | flatparameter
  flatparameter = fpws | fpd
  fpws = pname ws+
  fpd = pname delimiter
  treeparameter = "@" tflatparameter
  tflatparameter = tfpws | tfpd
  tfpws = pname ws+
  tfpd = pname delimiter

  pname = letterRest letterRest*
  rewrites = rw1 | rw2
  rw1 = "[[" ws* code? rwstringWithNewlines "]]" ws*
  rw2 = rwstring

  letter1 = "_" | "a" .. "z" | "A" .. "Z"
  letterRest = "0" .. "9" | letter1

  comment = "%%" notEol* eol
  notEol = ~eol any
  
  eol = "\n"
  ws = comment | eol | " " | "\t" | "," 
  delimiter = &"]" | &"="

  rwstring = stringchar*
  stringchar = ~"\n" any

  rwstringWithNewlines = nlstringchar*
   nlstringchar = ~"]]" ~"}}" any
  code = "{{" ws* codeString "}}" ws* 
  codeString = rwstringWithNewlines

}
`;


var varNameStack = [];


var glueSemantics = {	
    semantics: function (_1s, _2s) { 
	var __1s = _1s._glue ().join (''); 
	var __2s = _2s._glue ().join (''); 
	return `
{
${__2s}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c._glue ()); }
}`; 
    },
    semanticsStatement: function (_1, _2s, _3, _4s, _5, _6, _7s, _8, _9s, _10s, _11, _12s) {
	varNameStack = [];
	var __1 = _1._glue ();
	var __2s = _2s._glue ().join ('');
	var __3 = _3._glue ();
	var __4s = _4s._glue ().join ('');
	var __5 = _5._glue ();
	var __6 = _6._glue ();
	var __7s = _7s._glue ().join ('');
	var __8 = _8._glue ();
	var __9s = _9s._glue ().join ('');
	var __10s = _10s._glue ().join ('');
	var __11 = _11._glue ();
	var __12s = _12s._glue ().join ('');
	return `
${__1} : function (${__5}) { 
_ruleEnter ("${__1}");
${__10s}
${varNameStack.join ('\n')}
var _result = \`${__11}\`; 
_ruleExit ("${__1}");
return _result; 
},
            `;
    },
    ruleName: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1 + __2s; },
    parameters: function (_1s) {  var __1s = _1s._glue ().join (','); return __1s; },
    
    parameter: function (_1) { 
	var __1 = _1._glue ();
	return `${__1}`;
    },
    flatparameter: function (_1) { 
	var __1 = _1._glue (); 
	varNameStack.push (`var ${__1} = _${__1}._glue ();`);
	return `_${__1}`;
    },
    fpws: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1; },
    fpd: function (_1, _2) { var __1 = _1._glue (); var __2 = _2._glue (); return __1; },
    
    treeparameter: function (_1, _2) { 
	var __1 = _1._glue (); 
	var __2 = _2._glue (); 
	varNameStack.push (`var ${__2} = _${__2}._glue ().join ('');`);
	return `_${__2}`; 
    },
    tflatparameter: function (_1) { 
	var __1 = _1._glue (); 
	return `${__1}`;
    },
    tfpws: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1; },
    tfpd: function (_1, _2) { var __1 = _1._glue (); var __2 = _2._glue (); return __1; },

    pname: function (_1, _2s) { var __1 = _1._glue (); var __2s = _2s._glue ().join (''); return __1 + __2s;},
    rewrites: function (_1) { var __1 = _1._glue (); return __1; },
    rw1: function (_1, _2s, codeQ, _3, _4, _5s) {
	var __2 = _2s._glue ().join ('');
	var code = codeQ._glue ();
	var __3 = _3._glue ();
	if (0 === code.length) {
  	    return `${__2}${__3}`;
	} else {
	    process.stderr.write ('code is NOT empty\n');
	    throw "code in rw1 NIY";
  	    return `${code}${__3}`;
	}
    },
    rw2: function (_1) { var __1 = _1._glue (); return __1; },
    letter1: function (_1) { var __1 = _1._glue (); return __1; },
    letterRest: function (_1) { var __1 = _1._glue (); return __1; },

    ws: function (_1) { var __1 = _1._glue (); return __1; },
    delimiter: function (_1) { return ""; },

    rwstring: function (_1s) { var __1s = _1s._glue ().join (''); return __1s; },
    stringchar: function (_1) { var __1 = _1._glue (); return __1; },
    rwstringWithNewlines: function (_1s) { var __1s = _1s._glue ().join (''); return __1s; },
    nlstringchar: function (_1) { var __1 = _1._glue (); return __1; },

    code: function (_1, _2s, _3, _4, _5s) { return _3._glue (); },
    codeString: function (_1) { return _1._glue (); },

    // Ohm v16 requires ...children, previous versions require no ...
    _iter: function (...children) { return children.map(c => c._glue ()); },
    _terminal: function () { return this.sourceString; }
};


function ohm_parse (maybeMultipleGrammars, grammar, text, errorMessage) {
    var parser;
    if (maybeMultipleGrammars && argv.grammarname) {
	var grammars = ohm.grammars (grammar);
	parser = grammars [argv.grammarname];
    } else {
	parser = ohm.grammar (grammar);
    }
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { parser: parser, cst: cst };
    } else {
	// console.error (parser.trace (text).toString ());
	// console.error (text.length);
	// console.error ("/" + text + "/");
	// or ... 
	if (argv.errorview) {
	    console.error (text);
	}
	var pos = cst._rightmostFailurePosition;
	throw ("FAIL: at position " + pos.toString () + " " + errorMessage);
    }
}

function transpiler (maybeMultipleGrammars, scnText, grammar, semOperation, semanticsObject, errorMessage) {
    var { parser, cst } = ohm_parse (maybeMultipleGrammars, grammar, scnText, errorMessage);
    var sem = {};
    try {
	if (cst.succeeded ()) {
	    sem = parser.createSemantics ();
	    sem.addOperation (semOperation, semanticsObject);
	    let result = sem (cst)[semOperation]();
	    return result;
	} else {
	    throw ("fail: " + " " + errorMessage);
	}
    } catch (err) {
	throw err;
    }
}
function gluetranspiler (scnText, grammar, semOperation, semanticsObject, errorMessage) {
    return transpiler(false, scnText, grammar, semOperation, semanticsObject, errorMessage);
}

function inputtranspiler (scnText, grammar, semOperation, semanticsObject, errorMessage) {
    return transpiler(true, scnText, grammar, semOperation, semanticsObject, errorMessage);
}


function _ruleInit () {
}

function traceSpaces () {
    var n = traceDepth;
    while (n > 0) {
	process.stderr.write (" ");
	n -= 1;
    }
    process.stderr.write ('[');
    process.stderr.write (traceDepth.toString ());
    process.stderr.write (']');
}

function _ruleEnter (ruleName) {
    if (tracing) {
	traceDepth += 1;
	traceSpaces ();
	process.stderr.write("enter: ");
	process.stderr.write (ruleName.toString ());
	process.stderr.write ("\n");
    }
}

function _ruleExit (ruleName) {
    if (tracing) {
	traceSpaces ();
	traceDepth -= 1;
	process.stderr.write("exit: "); 
	process.stderr.write (ruleName); 
	process.stderr.write ("\n");
    }
}


function execTranspiler (source, grammar, semantics, errorMessage, srcFilename, glueFilename) {
    // first pass - transpile glue code to javascript
    try {
	let generatedSCNSemantics = gluetranspiler (semantics, glueGrammar, "_glue", glueSemantics, "in FORMAT specification: " + glueFilename);
    _ruleInit();
	try {
	    if (viewGeneratedCode) {
		console.error ("[ execTranspiler");
		console.error (generatedSCNSemantics);
		console.error ("execTranspiler ]");
	    }
            let semObject = eval('(' + generatedSCNSemantics + ')');
	    try {
		let tr = inputtranspiler(source, grammar, "_glue", semObject, srcFilename);
		return tr;
	    } catch (err) {
		throw err;
	    }
	}
	catch (err) {
	    throw err;
	}
    } catch (err) {
	// console.error ('source:');
	// console.error (source.replace (/[\n\t ]/g,'.'));
	throw err;
    }
}

function internal_stranspile (sourceString, grammarFileName, glueFileName, errorMessage, srcFilename) {
    var grammar = fs.readFileSync (grammarFileName, 'utf-8');
    var glue = fs.readFileSync (glueFileName, 'utf-8');
    var returnString = execTranspiler (sourceString, grammar, glue, errorMessage, srcFilename, glueFileName);
    return returnString;
}




function dump (announce, s) {
    if (argv.split) {
	console.error ();
	console.error (announce);
	console.error (s);
	console.error (announce);
	console.error ();
    }
}

function expand (s, grammarFileName, glueFileName, message, srcFilename) {
    dump ("********* block *********", s);
    var result = internal_stranspile (s, grammarFileName, glueFileName, message, srcFilename);
    dump ("********* Expanded ******", result);
    return result;
}

function splitOnSeparators (triggerSep, endSep, s) {
    // s = front + beginSep + middle + endSep + rest
    // if there is nothing to expand (i.e. no beginSep), s = front
    // return 3 parts, excluding beginSep and endSep

    var frontMatch = s.match (triggerSep);
    if (frontMatch) {

    	var indexEndFront = frontMatch.index;   
	var frontText = s.substring (0, indexEndFront);

	var beginSepText = frontMatch [0];
        // s contains a begin separator : front + beginSep + middle + endSep + rest
	var middleEndSepRestText = s.substring (indexEndFront + beginSepText.length);
        // middleEndSepRestText is : middle + endSep + rest


	var endMatch = middleEndSepRestText.match (endSep);
	if (endMatch) {
	    ;
	} else {
	    dump ("thus far:",middleEndSepRestText);
	    errormsg = `cannot find end separator ${endSep}`;
	    throw errormsg;
	}

	var indexEndEnd = endMatch.index;
	var endSepText = endMatch [0];

	let  middleText;
	let restText;
	if (argv.inclusive ) {
	    // include endSepText in block
	    middleText = beginSepText + middleEndSepRestText.substring (0, indexEndEnd) + endSepText;
	    restText = middleEndSepRestText.substring (indexEndEnd + endSepText.length);
	} else {
	    // endSepText is not part of block
	    middleText = beginSepText + middleEndSepRestText.substring (0, indexEndEnd);
	    restText = endSepText + middleEndSepRestText.substring (indexEndEnd + endSepText.length);
	}
	return { front: frontText, middle: middleText, rest: restText };
    } else {
	// there is no middle nor rest (no beginSep)
	return { front: s, middle: '', rest: '' };
    }
}

function pdebug (s) {
    if (10 < s.length) {
	console.error (s.substring(0,10) + "...");
    } else {
	console.error (s);
    }
}

function expandAll (s, triggerRE, endRE, grammarFileName, glueFileName, message, srcFilename) {
    dump ("*** expandAll ***", s);
    if (s === undefined) {
	return s;
    } else {
	let _retObj = splitOnSeparators (triggerRE, endRE, s);
	let {front: front, middle: middle, rest: rest} = _retObj;
	
	if (middle === undefined || middle === '') {
	    return front;
	} else {
	    dump ("*** expansion ***", middle);
	    var expandedText = expand (middle, grammarFileName, glueFileName, message, srcFilename);
	    cycles += 1;
	    if (stop & (cycles >= stop)) {
		return front + expandedText + rest;
	    } else {
		if (expandedText === middle) {
		    console.error ('expand made no changes');
		    console.error (middle.substring (0,30));
		    console.error (expandedText.substring (0,30));
		    throw 'expand made no changes';
		}
		return front + expandAll (expandedText + rest, triggerRE, endRE, grammarFileName, glueFileName, message, srcFilename);
	    }
	}
    }
}

function pre (allchars) {
    var reTrigger = new RegExp (argv._[0]);
    var reEnd = new RegExp (argv._[1]);
    var grammarFileName = argv._[2];
    var glueFileName = argv._[3];

    if (argv.support) {
	support = require (argv.support);
	if (support.setArgv) {
	    support.setArgv (argv);
	}
    }
    if (argv.fmt) {
	fmt = require (argv.fmt);
	if (fmt.setArgv) {
	    fmt.setArgv (argv);
	}
    }
    if (argv.trace) {
	var traceFlag = true;
	if (traceFlag === 't') {
	    tracing = true;
	    traceDepth = 0;
	}
    }


    var expanded = expandAll (allchars, reTrigger, reEnd, grammarFileName, glueFileName, 'STDIN', 'STDIN');
    return expanded;
}

function prep (text, grammarfilename, semanticsfilename, supportfilename, stopcount) {
    argv._ = ['.', '$', grammarfilename, semanticsfilename];
    argv.support = supportfilename;
    argv.errorview = true;
    stop=stopcount;
    return pre (text)
}

// function main () {
//     argv = require('yargs/yargs')(process.argv.slice(2)).argv;
//     var fname;
//     if (argv.input) {
// 	fname = argv.input;
//     } else {
// 	fname = '/dev/fd/0';
//     }
//     cycles = 0;
//     if (argv.stop) {
// 	stop = argv.stop;
//     } else {
// 	stop = undefined;
//     }
//     if (argv.view) {
// 	viewGeneratedCode = true;
//     } else {
// 	viewGeneratedCode = false;
//     }
//     if (argv.trace) {
// 	tracing = true;
// 	traceDepth = 0;
//     } else {
// 	tracing = false;
//     }
//     var allchars = fs.readFileSync (fname, 'utf-8');
//     var result = pre (allchars);
//     emit (result);
// }
// function emit (s) {
//     console.log (s);
// }

// function getargv (s) {
//     let r = argv[s];
//     if (r) {
// 	return r;
//     } else {
// 	return "";
//     }
// }

// main ();



function main () {
    // don't edit this, edit post.js instead
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    var d = new bootstrap (null, "d2f top");
    var kstart = d.lookupChild ("kickStart");
    kstart.handler (kstart, null);
    kstart.container.wakeup ();
          // htmlbutton.handler (htmlbutton, null);
          // htmlbutton.container.wakeup ();
          // let outs = testBench.outputs ();
          // if (Array.isArray (outs)) {
          //     if (outs.length > 0) {
          //         let order = outs [0].data;
          //         //document.getElementById ('output').innerHTML = outs.toString () + '\ndone';
          //         document.getElementById ('output').innerHTML
          //             = order.item.toString () + '\nextra: ' + order.extras.toString () + '\ncondiments: ' + order.condiments.toString ();
}    


main ();
