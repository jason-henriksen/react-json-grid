# [React ES6 Template Component](https://github.com/jason-henriksen/react-es6-npm-component-template) 

*Empty ES6 npm component module for react.  Starter for your own npm module deployment.*


### Intro
I've been developing applications with create-react-app.   However, I could not use it to build a component for use as an NPM module.
There are many tutorials about how to do this, but I wanted a simpler "just copy this" repo to pull from.
This repo is based off of the work by: gokulkrishh.


##### 1. Clone the repository

```bash
git clone https://github.com/jason-henriksen/react-es6-npm-component-template.git newComp
```

##### 2. Make it your own repository

```bash 
rm -rf .git
git init
```

##### 3. Install dependencies

```bash
npm install
```

### Folder Structure

```
.
├── test/
├── dist/
├── demo/
├── src/
│   └── index.js
│   └── styles.css
├── package.json
└── webpack.config.js
```

### Features

- [`Webpack v2`](https://webpack.js.org/) for bundling the dependencies.

- `ES6` support.

- `ESLint` support.

- [`Jest`](https://facebook.github.io/jest/docs/tutorial-react.html) for test cases.

- `Travis CI` support.


### Make it your own component

- In package.json file change the name from `react-es6-npm-component-template` to `your-component-name`.

- Open src/index.js and make it behave as your component needs to.

### Available scripts

- `npm run start`  - To start webpack dev-server.

- `npm run watch`  - To watch a file change and build the component.

- `npm run build`  - To produce the build file.

- `npm run deploy` - To deploy the demo folder to gh-pages.

- `npm run test`   - To run test cases.


### [Publish as node module](https://docs.npmjs.com/getting-started/creating-node-modules)

```bash 
npm login
npm publish
```

*Make sure your package name, version and other information in `package.json` is correct.*

## License

MIT © [Jason Henriksen](https://github.com/jason-henriksen)
