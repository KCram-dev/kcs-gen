const run = require('./runner');
const args = process.argv.splice(2);
const help = `
react-gen <app_name>
Genera un nuevo proyecto react siguiendo el estilo interno

Opciones:
-h     mostrar esta ayuda

------------------------------------------------------------
Kcram Solutions © 2023
 `;
 
if( args[0] === '-h' || args[0] === '--help'){
    console.log(help);
    process.exit(0)
}

if( args.length > 1 ){
    console.log(help);
    process.exit(0)
}

const name = args[0];
const path = process.cwd();
// console.log(__dirname);
run(path, name)
