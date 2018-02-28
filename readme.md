

Simple react grid UI to display and edit any array of JSON data.

This project is inspired by react-data-grid.

Most grid UI tools are either lacking in features, or require you to format your data in order to make it display in the grid.
react-json-grid is designed to work with whatever data you already have handy, wether it's an array of JSON objects or simply 
a two dimensional array of values.

This project is under active development, however an API exploration tool will be available momentarily.


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

