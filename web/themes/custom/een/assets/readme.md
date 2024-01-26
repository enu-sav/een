# Assets
- [Requirements](#requirements)
- [Installation Guide](#installation)
- [Adding assets](#adding-assets)
- [Compiling assets...](#adding-assets)
- [...Gulp tasks in PhpStorm](#gulp-tasks-in-phpstorm)
- [...Gulp tasks CLI](#gulp-tasks-with-cli)
- [NodeJS, NPM & N](#nodejs-npm--n)
- [Troubleshooting](#troubleshooting)

## Requirements
Node version: 18.6.0

NPM version: 9.6.5

=> Manage your NodeJS versions with "[n](https://www.npmjs.com/package/n)"

Please keep this library up-to-date with the latest NodeJS-LTS version.

## Installation
In the same directory where the package.json resides:
```bash
$ npm install
```

## Adding assets
Put your source files in the corresponding folder in the <b>./src</b> directory. The processed files will go to <b>./dist</b>

```plain
└── src
    ├── img       // your images
    ├── fonts     // your font files
    ├── js        // your javascript
    ├── sass      // your sass
    ├── sprite    // contains a template for the svg-sprite generator and icons which you want in sprite. 
                     All icons from sprite folder will be also compressed and copied to the svg folder. 
    └── svg       // ...guess what, it's for your svg files
```

The processed assets will go to:

```plain
└── dist
    ├── img       // minified images
    ├── fonts     // fonts from src folder
    ├── js        // transpiled javascript
    ├── libs      // Copied libraries from node_modules
    ├── css       // compiled css
    └── svg       // minified svg and the generated svg-sprite
```

<b>IMPORTANT: Manually added files in the ./dist folder will be deleted when 
running gulp tasks!</b>

Put static files, downloaded resources, fonts etc. in the ./src/libs folder, 
this directory will be copied as is to ./dist/libs. If you would like to 
process these files (minify, concat, etc.), you will have to implement these 
tasks yourself. Best case scenario: you don't use
the libs directory and import libraries from node_module or CDN

## Adding external libs
We use npm packages and then we copy the dist folder from node_modules during compiling.

```bash
$ npm i your_package --save-dev
```

Update ./config.js file and add source (src) and destination (dest) path in config.paths.libs


## Compiling assets
### Gulp tasks in PhpStorm
In PhpStorm right-click on the gulpfile.js and select "Show Gulp Tasks". A 
new panel will open and list all the available gulp tasks. You can run any task 
by double clicking on it.

    - build: build everything but without watch
    - watch: only watch changes in the ./src directory and process accordingly
    - start: build everything with watch

<b>IMPORTANT:</b> If you have several node_modules directories with different 
Gulp versions loading the Gulp tasks may fail. See [troubleshooting](#troubleshooting)

### Gulp tasks with CLI
All tasks can be run on the CLI. Examples:
```bash
$ npm run build
$ npm run watch
$ npm run start
```

## NODEJS, NPM & N
```bash
$ npm -g install n
```
Once n is installed you can switch you NodeJS version
```bash
$ n
```
Select the desired version with the arrow keys and press enter.

Install different NodeJS version with:
```bash
$ n 18.6.0
```

## Troubleshooting
#### Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (57)
```bash
$ npm rebuild node-sass
```

#### Gulp-Imagemin Error: spawn /[some-local-path]/node_modules/mozjpeg/vendor/cjpeg ENOENT
See https://github.com/sindresorhus/gulp-imagemin/issues/338

Sometimes npm fails to install vendor libraries from modules. Delete and reinstall node_modules
```bash
$ rm -rf node_modules
$ npm install
```
