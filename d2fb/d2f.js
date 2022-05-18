

var prolog_convert_to_json_signature = {
    name: "prolog_convert_to_json",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var prolog_convert_to_json_protoImplementation = {
    name: "prolog_convert_to_json",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfprolog2json (message.data);
me.send ("out", x, message);


    }
}

function prolog_convert_to_json (container, instancename) {
    let me = new Leaf (prolog_convert_to_json_signature, prolog_convert_to_json_protoImplementation, container, instancename);
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
        // console.log (message.data);
done ();


    }
}

function finish (container, instancename) {
    let me = new Leaf (finish_signature, finish_protoImplementation, container, instancename);
    return me;
}



var edge_containment_new_signature = {
    name: "edge_containment_new",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var edge_containment_new_protoImplementation = {
    name: "edge_containment_new",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfedgecontainment_new (message.data);
me.send ("out", x, message);


    }
}

function edge_containment_new (container, instancename) {
    let me = new Leaf (edge_containment_new_signature, edge_containment_new_protoImplementation, container, instancename);
    return me;
}



var direct_containment_signature = {
    name: "direct_containment",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var direct_containment_protoImplementation = {
    name: "direct_containment",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdirectcontainment (message.data);
me.send ("out", x, message);


    }
}

function direct_containment (container, instancename) {
    let me = new Leaf (direct_containment_signature, direct_containment_protoImplementation, container, instancename);
    return me;
}



var probeFBd2f_signature = {
    name: "probeFBd2f",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var probeFBd2f_protoImplementation = {
    name: "probeFBd2f",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfprobeFBd2f (message.data);
me.send ("out", x, message);


    }
}

function probeFBd2f (container, instancename) {
    let me = new Leaf (probeFBd2f_signature, probeFBd2f_protoImplementation, container, instancename);
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



var kinds_signature = {
    name: "kinds",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var kinds_protoImplementation = {
    name: "kinds",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfkinds (message.data);
me.send ("out", x, message);


    }
}

function kinds (container, instancename) {
    let me = new Leaf (kinds_signature, kinds_protoImplementation, container, instancename);
    return me;
}



var name_signature = {
    name: "name",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var name_protoImplementation = {
    name: "name",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfnames (message.data);
me.send ("out", x, message);


    }
}

function name (container, instancename) {
    let me = new Leaf (name_signature, name_protoImplementation, container, instancename);
    return me;
}



var color_signature = {
    name: "color",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var color_protoImplementation = {
    name: "color",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfcolor (message.data);
me.send ("out", x, message);


    }
}

function color (container, instancename) {
    let me = new Leaf (color_signature, color_protoImplementation, container, instancename);
    return me;
}



var whole_signature = {
    name: "whole",
    inputs: [],
    outputs: []
}



function whole_makechildren (container) {
      var child1 = new prolog_convert_to_json (container, "prolog_convert_to_json");
        var child2 = new finish (container, "finish");
        var child3 = new edge_containment_new (container, "edge_containment_new");
        var child4 = new direct_containment (container, "direct_containment");
        var child5 = new probeFBd2f (container, "probeFBd2f");
        var child6 = new diagramparser (container, "diagramparser");
        var child7 = new asfactbase (container, "asfactbase");
        var child8 = new deleteblanklines (container, "deleteblanklines");
        var child9 = new sortForPROLOG (container, "sortForPROLOG");
        var child10 = new deleteTrailingSugar (container, "deleteTrailingSugar");
        var child11 = new kickStart (container, "kickStart");
        var child12 = new kinds (container, "kinds");
        var child13 = new name (container, "name");
        var child14 = new color (container, "color");
        var child15 = new boundingbox (container, "boundingbox");
        var child16 = new direction (container, "direction");
        var child17 = new styleexpander (container, "styleexpander");
        var child18 = new contains (container, "contains");
        var child19 = new contains_port (container, "contains_port");
        var child20 = new uncompress (container, "uncompress");
        var child21 = new indirect_containment (container, "indirect_containment");
        var child22 = new sync_code (container, "sync_code");
        var child23 = new connections (container, "connections");
        var child24 = new design_rule_edge_containment (container, "design_rule_edge_containment");
      var children = [ {name: "prolog_convert_to_json", runnable: child1}, {name: "finish", runnable: child2}, {name: "edge_containment_new", runnable: child3}, {name: "direct_containment", runnable: child4}, {name: "probeFBd2f", runnable: child5}, {name: "diagramparser", runnable: child6}, {name: "asfactbase", runnable: child7}, {name: "deleteblanklines", runnable: child8}, {name: "sortForPROLOG", runnable: child9}, {name: "deleteTrailingSugar", runnable: child10}, {name: "kickStart", runnable: child11}, {name: "kinds", runnable: child12}, {name: "name", runnable: child13}, {name: "color", runnable: child14}, {name: "boundingbox", runnable: child15}, {name: "direction", runnable: child16}, {name: "styleexpander", runnable: child17}, {name: "contains", runnable: child18}, {name: "contains_port", runnable: child19}, {name: "uncompress", runnable: child20}, {name: "indirect_containment", runnable: child21}, {name: "sync_code", runnable: child22}, {name: "connections", runnable: child23}, {name: "design_rule_edge_containment", runnable: child24} ];
      return children;
}

function whole_makeconnections (container) {
    var conn25 = {sender:{name: "uncompress", etag: "out"}, net: "NIY", receivers:  [{name: "diagramparser", etag: "in"}] };
    var conn26 = {sender:{name: "prolog_convert_to_json", etag: "out"}, net: "NIY", receivers:  [{name: "finish", etag: "in"}] };
    var conn27 = {sender:{name: "edge_containment_new", etag: "out"}, net: "NIY", receivers:  [{name: "sync_code", etag: "in"}] };
    var conn28 = {sender:{name: "direct_containment", etag: "out"}, net: "NIY", receivers:  [{name: "edge_containment_new", etag: "in"}] };
    var conn29 = {sender:{name: "probeFBd2f", etag: "out"}, net: "NIY", receivers:  [{name: "kinds", etag: "in"}] };
    var conn30 = {sender:{name: "diagramparser", etag: "out"}, net: "NIY", receivers:  [{name: "styleexpander", etag: "in"}] };
    var conn31 = {sender:{name: "styleexpander", etag: "out"}, net: "NIY", receivers:  [{name: "asfactbase", etag: "in"}] };
    var conn32 = {sender:{name: "asfactbase", etag: "out"}, net: "NIY", receivers:  [{name: "deleteblanklines", etag: "in"}] };
    var conn33 = {sender:{name: "deleteblanklines", etag: "out"}, net: "NIY", receivers:  [{name: "sortForPROLOG", etag: "in"}] };
    var conn34 = {sender:{name: "sortForPROLOG", etag: "out"}, net: "NIY", receivers:  [{name: "deleteTrailingSugar", etag: "in"}] };
    var conn35 = {sender:{name: "kickStart", etag: "out"}, net: "NIY", receivers:  [{name: "uncompress", etag: "in"}] };
    var conn36 = {sender:{name: "deleteTrailingSugar", etag: "out"}, net: "NIY", receivers:  [{name: "probeFBd2f", etag: "in"}] };
    var conn37 = {sender:{name: "kinds", etag: "out"}, net: "NIY", receivers:  [{name: "name", etag: "in"}] };
    var conn38 = {sender:{name: "name", etag: "out"}, net: "NIY", receivers:  [{name: "color", etag: "in"}] };
    var conn39 = {sender:{name: "color", etag: "out"}, net: "NIY", receivers:  [{name: "boundingbox", etag: "in"}] };
    var conn40 = {sender:{name: "boundingbox", etag: "out"}, net: "NIY", receivers:  [{name: "direction", etag: "in"}] };
    var conn41 = {sender:{name: "direction", etag: "out"}, net: "NIY", receivers:  [{name: "contains", etag: "in"}] };
    var conn42 = {sender:{name: "contains", etag: "out"}, net: "NIY", receivers:  [{name: "contains_port", etag: "in"}] };
    var conn43 = {sender:{name: "contains_port", etag: "out"}, net: "NIY", receivers:  [{name: "indirect_containment", etag: "in"}] };
    var conn44 = {sender:{name: "indirect_containment", etag: "out"}, net: "NIY", receivers:  [{name: "direct_containment", etag: "in"}] };
    var conn45 = {sender:{name: "sync_code", etag: "out"}, net: "NIY", receivers:  [{name: "connections", etag: "in"}] };
    var conn46 = {sender:{name: "connections", etag: "out"}, net: "NIY", receivers:  [{name: "prolog_convert_to_json", etag: "in"}] };
    var connections = [ conn25, conn26, conn27, conn28, conn29, conn30, conn31, conn32, conn33, conn34, conn35, conn36, conn37, conn38, conn39, conn40, conn41, conn42, conn43, conn44, conn45, conn46 ];
    return connections;
}

function whole_makenets (container) {
    return [];
}

var whole_protoImplementation = {
    name: "whole",
    kind: "container",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
}

function whole (container, instancename) {
    let me = new Container (whole_signature, whole_protoImplementation, container, instancename);
    me.children = whole_makechildren (me);
    me.connections = whole_makeconnections (me);
    me.nets =  whole_makenets (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    return me;
}



var boundingbox_signature = {
    name: "boundingbox",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var boundingbox_protoImplementation = {
    name: "boundingbox",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfboundingbox (message.data);
me.send ("out", x, message);


    }
}

function boundingbox (container, instancename) {
    let me = new Leaf (boundingbox_signature, boundingbox_protoImplementation, container, instancename);
    return me;
}



var direction_signature = {
    name: "direction",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var direction_protoImplementation = {
    name: "direction",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdirection (message.data);
me.send ("out", x, message);


    }
}

function direction (container, instancename) {
    let me = new Leaf (direction_signature, direction_protoImplementation, container, instancename);
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



var contains_signature = {
    name: "contains",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var contains_protoImplementation = {
    name: "contains",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfcontains (message.data);
me.send ("out", x, message);


    }
}

function contains (container, instancename) {
    let me = new Leaf (contains_signature, contains_protoImplementation, container, instancename);
    return me;
}



var contains_port_signature = {
    name: "contains_port",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var contains_port_protoImplementation = {
    name: "contains_port",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfcontainsport (message.data);
me.send ("out", x, message);


    }
}

function contains_port (container, instancename) {
    let me = new Leaf (contains_port_signature, contains_port_protoImplementation, container, instancename);
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



var indirect_containment_signature = {
    name: "indirect_containment",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var indirect_containment_protoImplementation = {
    name: "indirect_containment",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfindirectcontainment (message.data);
me.send ("out", x, message);


    }
}

function indirect_containment (container, instancename) {
    let me = new Leaf (indirect_containment_signature, indirect_containment_protoImplementation, container, instancename);
    return me;
}



var sync_code_signature = {
    name: "sync_code",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var sync_code_protoImplementation = {
    name: "sync_code",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfsynccode (message.data);
me.send ("out", x, message);


    }
}

function sync_code (container, instancename) {
    let me = new Leaf (sync_code_signature, sync_code_protoImplementation, container, instancename);
    return me;
}



var connections_signature = {
    name: "connections",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var connections_protoImplementation = {
    name: "connections",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfconnections (message.data);
me.send ("out", x, message);


    }
}

function connections (container, instancename) {
    let me = new Leaf (connections_signature, connections_protoImplementation, container, instancename);
    return me;
}



var design_rule_edge_containment_signature = {
    name: "design_rule_edge_containment",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var design_rule_edge_containment_protoImplementation = {
    name: "design_rule_edge_containment",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        var x = sfdesignruleedgecontainment (message.data);
me.send ("out", x, message);


    }
}

function design_rule_edge_containment (container, instancename) {
    let me = new Leaf (design_rule_edge_containment_signature, design_rule_edge_containment_protoImplementation, container, instancename);
    return me;
}


