function handler_HTMLbutton (me, message) {
    me.send ("click", true);
}

var HTMLbutton_signature = {
    name: "HTMLbutton",
    inputs: [],
    outputs: [
	{ "name": "click", "structure": [] }
    ]
};

let HTMLbutton_protoImplementation = {
    name: "HTMLbutton",
    kind: "leaf",
    handler: handler_HTMLbutton,
    begin: function () {},
    finish: function () {}
};

function HTMLbutton (container, instancename) {
    let me = new Leaf (HTMLbutton_signature, HTMLbutton_protoImplementation, container, instancename);
    return me;
}

    
