var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako
var fs   = require ('fs');

function rf () {
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    //var bytes = fs.readFileSync ('d2f.drawio', 'utf-8');
    var bytes = fs.readFileSync (argv._[0], 'utf-8');
    console.log (`rf len=${bytes.length} type=${typeof bytes}`);
    console.log (bytes);
}

rf ();
