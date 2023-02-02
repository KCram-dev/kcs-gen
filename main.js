const args = process.argv.splice(2);
const help = `
react-gen <app_name>
Genera un nuevo proyecto react siguiendo el estilo interno

Opciones:
-h     mostrar esta ayuda

------------------------------------------------------------
copy Kcram Solutions
 `;
 
if( args[0] === '-h' || args[0] === '--help'){
    console.log(help);
    process.exit(0)
}

if( args.length > 1 ){
    console.log(help);
    process.exit(0)
}
