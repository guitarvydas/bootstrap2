var OrderTaker_signature = {
    name: "Order Taker",
    inputs: [
        { name: "phrase", structure: ["phrase"] }
    ],
    outputs: [
        { name: "food order", structure: ["food order"] }
    ]
};

var OrderTaker_protoImplementation = {
    name: "Order Taker",
    kind: "container",
}       


function ot_makeChildren (me) {
    var child1 = new PhraseParser(me, "ot phrase parser");
    return [
        {"name": "phrase parser", "runnable": child1}
    ];
}

function ot_makeNets (me) {
    return [
        {"name":"⇒₁","locks":["phrase parser"]},
        {"name":"⇒₂","locks":["_me"]}, // subject to change: this only locks the ouput queue of the container
        {"name":"⇒₃","locks":["_me"]}, // subject to change (as above)
    ];
}


function ot_makeConnections (me) {
    return [
        {"sender":{"name":"_me","etag":"phrase"},
         "net":"⇒₁",
         "receivers": [{"name":"phrase parser","etag":"phrase"}]
        },                 
        {"sender":{"name":"phrase parser","etag":"order no choices"},
         "net":"⇒₂",
         "receivers": [{"name":"_me","etag":"food order"}]
        },
        {"sender":{"name":"phrase parser","etag":"order with choices"},
         "net":"⇒₃",
         "receivers": [{"name":"_me","etag":"food order"}]
        }
    ];
}

function OrderTaker (container, instancename) {
    let me = new Container (OrderTaker_signature, OrderTaker_protoImplementation, container, instancename);
    me.children = ot_makeChildren (me);
    me.nets = ot_makeNets (me);
    me.connections = ot_makeConnections (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    me.handler = function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
    return me;
}
