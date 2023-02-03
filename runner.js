const fs = require('fs');
const os = require('os');
const {exec} = require('node:child_process');
const{join} = require('path');
const {SimpleLogger} = require('mk-simple-logger');
const cliSpinners = require('cli-spinners');
const { execSync } = require('child_process');


SimpleLogger.setLogLevel('debug');
const log = console.log;

const manifest = {
    short_name: "KCS App",
    name: "Create KCS App Sample",
    "icons": [
      {
        "src": "logo192.png",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "logo192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "logo512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    theme_color: "#000000",
    background_color: "#ffffff"
  };

  const package ={
    "name": "pr-22-1912",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@testing-library/jest-dom": "^5.16.5",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      "web-vitals": "^2.1.4"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  }
const ignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;
  
async function delay(time) {
  return new Promise(r=> {
    setTimeout(r, time);
  })
}
async function create(path, name){
    // create main folder
    const src = name+"/src";
    const component = name + "/src/components";
    const public = name + "/public";
    const componentApp = component + '/app';
    manifest.short_name = name;
    package.name = name;
    const ora = await import('ora');
    const spiner2 = ora.default({
      text: 'Copaindo archivos',
      spinner: cliSpinners.timeTravel
    });
    try{
      spiner2.start();
        fs.mkdirSync(join(path, name));
        fs.mkdirSync(join(path, src));
        fs.mkdirSync(join(path, component));
        fs.mkdirSync(join(path, public));
        fs.cpSync( join(__dirname,'/assets/logo192.png'), join(path, public, 'logo192.png'));
        fs.cpSync(join(__dirname,'/assets/logo64.png'), join(path, public, 'logo64.png'));
        fs.cpSync( join(__dirname,'/assets/logo512.png'), join(path, public, 'logo512.png'));
        fs.cpSync( join(__dirname,'/assets/index.html'), join(path, public, 'index.html'));
        fs.cpSync( join(__dirname,'/assets/robots.txt'), join(path, public, 'robots.txt'));
        fs.cpSync( join(__dirname,'/assets/.gitignore'), join(path, name, '.gitignore'));
        await delay(1000);
        spiner2.text = "Creando archivos";
        fs.writeFileSync(join(path, public, 'manifest.json'), JSON.stringify(manifest, null, 2));
        fs.writeFileSync(join(path, name, 'package.json'), JSON.stringify(package, null, 2));
        fs.cpSync(join(__dirname,'/assets/index.js'), join(path, src, 'index.js'));
        fs.cpSync(join(__dirname,'/assets/reportWebVitals.js'), join(path, src, 'reportWebVitals.js'));
        fs.cpSync(join(__dirname,'/assets/App.js'), join(path, componentApp, 'App.js'));
        fs.cpSync(join(__dirname,'/assets/App.css'), join(path, componentApp, 'App.css'));
        await delay(1500);
        spiner2.succeed('Archivos creados');
    }catch(error){
        spiner2.fail("La carpeta ya existe");
        log(error);
        process.exit(0xf001);
    }
    try{
      process.chdir(join(path, name));
      const ora = await import('ora');
      const spinner = ora.default({
        text: 'Iniciando repositiorio',
        spinner: cliSpinners.timeTravel
      });
      spinner.start();
      await delay(3000);
      exec('git init').on('close', (e)=>{
        spinner.succeed('Repositorio creado');
      });
      
    }catch(err){
      console.error('No se ha podido iniciar el repositorio');
      process.exit(0xf002);
    }
    await delay(100);
    try{
      process.chdir(join(path, name));
      const ora = await import('ora');
      const spiner = ora.default({
        text: 'Instalando dependencias',
        spinner: cliSpinners.timeTravel
      });
      spiner.start();
      exec('npm i').on('error', (e) =>{
        spiner.fail('Error al instalar las dependencias');
        console.log(e);
      }).on('close', (e)=>{
        spiner.succeed('Instaladas dependencias');
        try{
        execSync('git add .gitignore src public package.json package-lock.json')
        execSync('git commit -m "ci: project init"');
        }catch(e){
          console.error('Error al hacer el commit');
        }
      });
      
    }catch(err){
      console.error('No se ha podido instalar las dependecias');
      process.exit(0xf002);
    }

    
}

module.exports = create;