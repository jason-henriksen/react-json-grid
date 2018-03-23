

Simple react grid UI to display and edit any array of JSON data.

This project is inspired by react-data-grid.

Most grid UI tools are either lacking in features, or require you to format your data in order to make it display in the grid.
react-json-grid is designed to work with whatever data you already have handy, wether it's an array of JSON objects or simply 
a two dimensional array of values.

This project is under active development, however an API exploration tool will be available momentarily.

## Features
- Accepts input data formatted as
-- array of javascript objects
-- array of arrays
-- array of primitivs
-- Comma Seperated Values string ( next month )
-- Pipe Seperated Values string ( next month )
-- Name Value Pairs ( next month )

- Very Fast manipulation of 10s of Thousands of Items
-- Built In Test UI allows test of 50K items at a button press
-- Editing of items is still quite smooth

- Built in editor for editing the grid
-- Cells can be edited by default
-- Various editors may be used by table or by column

- Built in formatters & validations for
-- Ints / Floats
-- Dollars / Euros / Pounds
-- Checkboxes
-- Menus
-- Date Picker / DateTime Picker
-- email addresses ( next month )
-- snail mail addresses ( next month )
-- IP addresses ( next month )

- Pivoted Tables

- Ability to use "textarea mode"

- Mouse Over Help Text on Headers

- Style object control over cells, headers and inputs.

- ClassName control over cells, headers and inputs (this month)

- Component replacements for cells, headers and inputs (this month)

- Built In Tool Hooks:
-- Add/Remove Rows
-- Import/Export Data
-- Page Controls
-- Custom Component Controls

- Multiple data manipulation styles
-- onChange / onRowAdd / onRowCut
-- onDataReplacement

- Multiple data input styles styles
-- supply entire data set a property
-- supply a row level get method (next month)
-- supply a MobX observable object and let the grid manipulate the data for you (next month)






## Install
```bash
npm i --save react-json-grid
```

## Usage

```javascript

this.data = [{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}];
return(
<Grid
  data={this.data}
  onChange={(x,y,objKey,value)=>{}}  
/>
);
```

