const os = require('os');
const fs = require('fs');
const{join} = require('path');
const {SimpleLogger} = require('mk-simple-logger');

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
  

function create(path, name){
    // create main folder
    const src = name+"/src";
    const component = name + "/src/components";
    const public = name + "/public";
    const componentApp = component + '/app';
    manifest.short_name = name;
    package.name = name;
    try{
        log('Creando la carpeta del proyecto:', join(path, name));
        fs.mkdirSync(join(path, name));
        log('Creando la carpeta de SRC:', join(path, src));
        fs.mkdirSync(join(path, src));
        log('Creando la carpeta de componentes:', join(path, component));
        fs.mkdirSync(join(path, component));
        log('Creando la carpeta public:', join(path, public));
        fs.mkdirSync(join(path, public));
        log('Copiando archivos a public')
        fs.cpSync('./assets/logo192.png', join(path, public, 'logo192.png'));
        fs.cpSync('./assets/logo64.png', join(path, public, 'logo64.png'));
        fs.cpSync('./assets/logo512.png', join(path, public, 'logo512.png'));
        fs.cpSync('./assets/index.html', join(path, public, 'index.html'));
        fs.cpSync('./assets/robots.txt', join(path, public, 'robots.txt'));
        fs.cpSync('./assets/.gitignore', join(path, public, '.gitignore'));
        log('Creando el manifest');
        fs.writeFileSync(join(path, public, 'manifest.json'), JSON.stringify(manifest, null, 2));
        log('Creando el package.json');
        fs.writeFileSync(join(path, name, 'package.json'), JSON.stringify(package, null, 2));
        fs.cpSync('./assets/index.js', join(path, src, 'index.js'));
        fs.cpSync('./assets/reportWebVitals.js', join(path, src, 'reportWebVitals.js'));
        log('Creando el componente App');
        fs.cpSync('./assets/App.js', join(path, componentApp, 'App.js'));
        fs.cpSync('./assets/App.css', join(path, componentApp, 'App.css'));
    }catch(error){
        log(error)
    }
}

module.exports = create;