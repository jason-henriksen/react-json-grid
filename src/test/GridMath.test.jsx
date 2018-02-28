import React from 'react';
import ReactDOM from 'react-dom';
import GridMath from '../GridMath';

var gm = new GridMath();

it('fails gracefully without any props', () => {
  var res = gm.calcGridBody(null,null);
  expect(res).toBeDefined();   // check that I got a resul
});

it('fails gracefully without scroll size', () => {
  var res = gm.calcGridBody({},null);
  expect(res).toBeDefined();   // check that I got a resul
});

it('fails gracefully without useful props', () => {
  var res = gm.calcGridBody({},20);
  expect(res).toBeDefined();   // check that I got a resul
});

it('calculates auto column width correction', () => {
  var res = gm.calcGridBody({
    data:[{a:1,b:5,c:10},{a:1,b:5,c:10}] ,
    width:300,
    borderWide:1,
    padWide:1,
    rowCount:30,
    rowHight:18,
    colHeaderHigh:18,

  },20);
  expect(res.autoColWide).toEqual(90);
});



