

Simple React grid UI to display and edit any array of JSON data.

Explore the API with a live-example, API Playground here:
## [https://react-json-grid.azurewebsites.net/](https://react-json-grid.azurewebsites.net/)

Most grid UI tools are either lacking in features, or require you to format your data in order to make it display in the grid.  react-json-grid is designed to work with whatever data you already have handy, whether it's an array of JSON objects or simply a two-dimensional array of values.

## Easiest API Possible
This component is built for line-of-business workhorse apps.  Primarily, this was created to assist with banking applications that require large amounts of configuration and editing long lists of complex data.


Because it has to have near-XLS levels of user-friendliness coupled with repeated use throughout the application, it is designed to be as simple to use and configure as possible.  For example, no matter what the format of data you've received, react-jason-grid can usually handle parsing and editing it.  Just go to the live [playground](https://react-json-grid.azurewebsites.net/) and give it a try.

## April 2018 - Still in Development
While this code is being written with the intention of production use with many thousands of rows, it is still under active development.  The code should be ready for production use soon.  Your ideas and contributions are welcome!


## Features
- Accepts input data formatted as:
  - Array of JavaScript objects
  - Array of arrays
  - Array of primitives
  - Comma-Separated Values string ( next month )
  - Pipe-Seperated Values string ( next month )
  - Name-Value Pairs ( next month )

- Very Fast manipulation of 10s of Thousands of Items
  - Built-in Test UI allows test of 50K items at a button press
  - Editing of items is still quite smooth
  - Intended for large-scale, prodution use in line-of-business applications

- Modern ES6 Component Code
  - Built to React 16.2 and will be kept up to date as React grows
  - No runtime warnings
  - Includes comprehensive storybook testing
  - Built for extensibility
  - Built for easy maintenance
  - Written with the observer/observable pattern of data management
  - HEAVILY commented for you to edit and contribute

- Built in editor for editing the grid
  - Cells can be edited by default
  - Various editors may be used by table or by column

- Built in formatters & validations for:
  - Ints / Floats
  - Dollars / Euros / Pounds
  - Checkboxes
  - Menus
  - Date Picker / DateTime Picker
  - Email addresses (next month)
  - Snail mail addresses (next month)
  - IP addresses (next month)

- Pivoted Tables

- Ability to edit the data in "textarea mode"

- Mouseover Help Text on Headers

- Style object control over cells, headers and inputs

- ClassName control over cells, headers and inputs

- Component replacements for cells, headers and inputs 

- Built-in Tool Hooks
  - Add/Remove Rows
  - Import/Export Data
  - Page Controls
  - Custom Component Controls

- Multiple data manipulation styles
  - onChange / onRowAdd / onRowCut
  - onDataReplacement

- Multiple data input styles styles
  - Supply entire data set a property
  - Supply a row-level get method (next month)
  - Supply a MobX observable object and let the grid manipulate the data for you (next month)



## Install for Use
```bash
npm i --save react-json-grid
```

## Install for testing
```bash
git clone https://github.com/jason-henriksen/react-json-grid.git
cd react-json-grid
npm install
npm run storybook
```

## Simple Usage
The API playground shows you the JSX you need to write in order to get the effect shown in the playground.  In a nutshell, the API looks like this:

```javascript
this.data = 
  [ {r:5,a:5,b:6,c:8,d:90},
    {r:4,a:5,b:6,c:8,d:90},
    {r:3,a:5,b:6,c:8,d:90},
    {r:2,a:5,b:6,c:8,d:90},
    {r:1,a:5,b:6,c:8,d:90}];

return(
<Grid
  data={this.data}
  onChange={(x,y,objKey,value)=>{ data[y][objKey]=value; }}  
/>
);
```

This project is inspired by react-data-grid.

