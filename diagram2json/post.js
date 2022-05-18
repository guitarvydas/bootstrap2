

function main () {
    // don't edit this, edit post.js instead
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    var d = new whole (null, "whole");
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
