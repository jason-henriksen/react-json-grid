import React from 'react';
import { setAddon,storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/Grid';
import  DocUI  from '../src/docTool/DocUI';
import EasyBool from '../src/easyTools/EasyBool';
import WrapperEasyBool from './WrapperEasyBool';

import MultiTest from '../src/multiTest/MultiTest';
import TestNameTool from '../src/multiTest/TestNameTool';

import DataNoiseMed from './dataNoiseMedium.js'
import DataNoiseSmall from './dataNoiseSmall.js'
import DataNoiseGiant from './dataNoiseGiant.js'

import JSXAddon from 'storybook-addon-jsx';

import '../src/TestCSS.css';

import testParameters from './testParameters.js';
var testData = TestNameTool(testParameters); // name each test after it's variable name.
console.log(testData);

setAddon(JSXAddon);


storiesOf('Grid Explorer', module)
  .addWithJSX('Interactive Documentation', () => (<DocUI/>))

storiesOf('Combinatorial Test Design - Self Check', module)
  .addWithJSX('Factorial Test1 - List Only', () => (
    <MultiTest
      target={<div/>}
      nameTests={testData}
      test={
      [ [ testData.testATest ] ]}
    />))
  .addWithJSX('Factorial Test1 - A*B', () => (
    <MultiTest
      target={<div />}
      nameTests={testData}
      test={
        [ [ testData.testATest, testData.testBTest ]]}
    />))
  .addWithJSX('Factorial Test1 - A*B*C', () => (
    <MultiTest
      target={<div />}
      nameTests={testData}
      test={
        [ // three lines of definition, 40 tests generated.
          [// pivot tests by object array data, plus normal and wide versions
            testData.testATest, testData.testBTest, testData.testCTest,
          ],
        ]}
    />))
  .addWithJSX('Factorial Test4 - Specific Name', () => (
    <MultiTest
      target={<div />}
      nameTests={testData}
      test={
        [ // three lines of definition, 40 tests generated.
          [// display only a single test, to show that the name works correctly
            testData.testATest.a0Test
          ],
        ]}
    />))
    
storiesOf('Combinatorial Test Design - Self Check', module)  
  .addWithJSX('Factorial Test - Basic Data', () => (
    <MultiTest 
    target={ <Grid/> }
    test={[
      [// all basic data tests: 
        testData.dataTypesTest
      ],  
    ]}
  />))
  .addWithJSX('Factorial Test - Pivots', () => (
    <MultiTest
      target={<Grid />}
      test={[
        [// pivot tests by object array data, plus normal and wide versions
          testData.dataTypesTest.objArrayTest,
          testData.pivotsTest.pivotOnNameTest,
          testData.pivotsHeaderTest
        ],
        [// pivot tests by object array data, plus normal and wide versions
          testData.dataTypesTest.arrArrayTest,
          testData.pivotsTest.pivotOnIndexTest,
          testData.pivotsHeaderTest
        ],
        [// pivot tests by object array data, plus normal and wide versions
          testData.dataTypesTest.primsTest,
          testData.pivotsTest.pivotOnPrimTest,
          testData.pivotsHeaderTest
        ],
      ]}
    />))
  .addWithJSX('Factorial Test - Borders and Pads', () => (
    <MultiTest
      target={<Grid />}
      test={[
        [// pivot tests by object array data, plus pad tests, note that I can easily winnow the tests to perform.
          testData.dataTypesTest.objArrayTest.objListStringTest,
          testData.padPlayTest
        ],
        [// pivot tests by object array data, plus pad tests, and pivot note that I can easily winnow the tests to perform.
          testData.dataTypesTest.objArrayTest.objListStringTest,
          testData.pivotsTest.pivotOnNameTest.pivotOnColBTest, 
          testData.padPlayTest
        ],
        [
          testData.dataTypesTest.arrArrayTest.arrayListForPivotTest,
          testData.padPlayTest        ],
        [
          testData.dataTypesTest.arrArrayTest.arrayListForPivotTest,
          testData.pivotsTest.pivotOnIndexTest.pivotOnColOneTest,
          testData.padPlayTest        ],
        [ 
          testData.dataTypesTest.primsTest.primsListMixedTest,
          testData.padPlayTest],
        [
          testData.dataTypesTest.primsTest.primsListMixedTest,
          testData.pivotsTest.pivotOnPrimTest.pivotOnTrueTest,
          testData.padPlayTest],
      ]}
    />))



storiesOf('Column Definition Debug', module)
  .addWithJSX('Col Def Debug',()=>
    (<Grid debugGridMath
      data={colDef}
      columnList={[
        { key: 'key', altText: 'key name (or index) of the data for this column.  You can re-order the key names to re-order the columns displayed.' },
        { key: 'title', altText: 'text in the title bar of the column' },
        { key: 'editDisabled', easyBool: true, altText: 'disable editing for this column' },
        { key: 'widePct', easyFloat: true, altText: 'percent of grid width to make this column.  Too big will cause side scrolling!' },
        { key: 'widePx', easyInt: true, altText: 'width in pixels to make this column.  Too big will cause side scrolling!' },
        { key: 'easyBool', easyBool: true, altText: 'render this column as a check box' },
        { key: 'easyInt', easyBool: true, altText: 'render and validate this column as an integer' },
        { key: 'easyFloat', easyBool: true, altText: 'render and validate this column as an float' },
        { key: 'easyDollar', easyBool: true, altText: 'render and validate this column as dollars' },
        { key: 'easyEuro', easyBool: true, altText: 'render and validate this column as euros' },
        { key: 'easyPound', easyBool: true, altText: 'render and validate this column as pounds' },
        { key: 'easyDate', easyBool: true, altText: 'render and validate this column as a date' },
        { key: 'easyDateTime', easyBool: true, altText: 'render and validate this column as a datetime' },
        { key: 'easyMenu', altText: 'render and validate this column as a menu. supply an array of values easyMenu={[a,b,c,d]} or a pipe separated list easyMenu={"a|b|c|d"}' },
        { key: 'altText', altText: 'provide help text when mousing over the column header' },
      ]}
      pivotOn='title'
      pivotRowHeaderWide={125}
      styleRowHeader={{ textAlign: 'left' }}
      gridHigh={600}
      gridWide={425}
    />))
;






const colDef =
  [
    {
      key: 'a', title: 'col A', editDisabled: '', widePct: '', widePx: '',
      easyBool: '', easyInt: '', easyFloat: '', easyDollar: '', easyEuro: '', easyPound: '',
      easyDate: '', easyDateTime: '', easyMenu: '', altText: '',
      styleHeader: '', styleInput: '', styleCell: '',
      compHeader: '', compInput: '', compCell: '', easyMenu: ''
    },
    {
      key: 'b', title: 'col B', editDisabled: '', widePct: '', widePx: '',
      easyBool: '', easyInt: '', easyFloat: '', easyDollar: '', easyEuro: '', easyPound: '',
      easyDate: '', easyDateTime: '', altText: '',
      styleHeader: '', styleInput: '', styleCell: '',
      compHeader: '', compInput: '', compCell: '', easyMenu: ''
    },
    {
      key: 'c', title: 'col C', editDisabled: '', widePct: '', widePx: '',
      easyBool: '', easyInt: '', easyFloat: '', easyDollar: '', easyEuro: '', easyPound: '',
      easyDate: '', easyDateTime: '', altText: '',
      styleHeader: '', styleInput: '', styleCell: '',
      compHeader: '', compInput: '', compCell: '', easyMenu: ''
    },
    {
      key: 'd', title: 'col D', editDisabled: '', widePct: '', widePx: '',
      easyBool: '', easyInt: '', easyFloat: '', easyDollar: '', easyEuro: '', easyPound: '',
      easyDate: '', easyDateTime: '', altText: '',
      styleHeader: '', styleInput: '', styleCell: '',
      compHeader: '', compInput: '', compCell: '', easyMenu: ''
    }
  ];


// addWithJSX is useful for good data, but looses nuance with deliberatly invalid data.
storiesOf('Error Handlers', module)
.addWithJSX('no input data 1',()=>(<div><Grid/><br/>{'<Grid/>'}</div>))
.addWithJSX('no input data 2',()=>(<div><Grid data={null}/><br/>{'<Grid data={null}/>'}</div>))
.addWithJSX('non-array input data 1',()=>(<div><Grid data={true}/><br/>{'<Grid data={true}/>'}</div>))
.addWithJSX('non-array input data 2',()=>(<div><Grid data={false}/><br/>{'<Grid data={false}/>'}</div>))
.addWithJSX('non-array input data 3',()=>(<div><Grid data={5}/><br/>{'<Grid data={5}/>'}</div>))
.addWithJSX('non-array input data 4',()=>(<div><Grid data={'Too Much Gin'}/><br/>{'<Grid data={"Too Much Gin"}/>'}</div>))
.addWithJSX('empty array, no columns',()=>(<div><Grid data={[]}/><br/>{'<Grid data={[]}/>'}</div>))
.addWithJSX('array of nulls, no columns',()=>(<div><Grid data={[null,null]}/><br/>{'<Grid data={[null,null]}/>'}</div>))
.addWithJSX('array of symbols',()=>(<div><Grid data={[Symbol('a'),Symbol('b')]}/><br/>{'<Grid data={[Symbol("a"),Symbol("b")]}/>'}</div>))
.addWithJSX('array of RegExp',()=>(<div><Grid data={[new RegExp(),new RegExp()]}/><br/>{'<Grid data={[new RegExp(),new RegExp()]}/>'}</div>))
.addWithJSX('array of Functions',()=>(<div><Grid data={[()=>{console.log('fail')},()=>{console.log('fail')}]}/><br/>{'<Grid data={[()=>{console.log("fail")},()=>{console.log("fail")}]}/>'}</div>))



storiesOf('obj[],small data,value tpes', module)
.addWithJSX('numeric values',()=>(<Grid data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed padded',()=>(<Grid borderWide={15} padWide={15} data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))


storiesOf('obj[],col defs,col sized and types', module)
.addWithJSX('col wide auto,noScroll,missing defs', () => (<Grid gridHighCollapse={false} showToolsAddCut debugGridMath
    columnList={[{ key: 'a', title: 'col A' }, { key: 'c', title: 'col C' }, { key: 'b', title: 'col B' }]}
    data={[{ r: null, a: true, b: 6, c: null, d: 90 }, { r: 4, a: false, b: 6, c: 8, d: 90 }, { r: 3, a: true, b: 6, c: null, d: 90 }, { r: 2, a: false, b: 6, c: 8, d: 90 }, { r: 1, a: true, b: 6, c: 8, d: 90 }]} />))
.addWithJSX('wide px,noScroll,missing defs',()=>(<Grid gridHighCollapse={false} showToolsAddCut debugGridMath 
                                columnList={[{key:'a',title:'col A',widePct:'75'},{key:'b',title:'col B',widePct:'10'},{key:'c',title:'col C',widePct:'5'}]} 
                                data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('wide pct,noScroll,defs out of order',()=>(<Grid  gridHighCollapse={false} showToolsAddCut 
                                columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5'},{key:'r',title:'col R'}]} 
                                data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('data types, in cell editors',()=>(<Grid 
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',easyBool:true},{key:'b',title:'col B',widePct:'15',easyDollar:true},{key:'c',title:'col C',widePct:'5',easyEuro:true},{key:'d',title:'col D',widePct:'5'},{key:'r',title:'col R',easyPound:true}]} 
  />))
.addWithJSX('data types, overlay editors',()=>(<Grid 
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',easyMenu:'a|b|c|d'},{key:'b',title:'col B',widePct:'15',easyMenu:['asdf','qwer','zxcv']},{key:'c',title:'col C',widePct:'5',easyEuro:true},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))


storiesOf('obj[], grid styles', module)  
  .addWithJSX('col data types, style headers all',()=>(<Grid 
    styleHeader={{backgroundColor:'pink'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  
  .addWithJSX('col data types, style headers all,pivot',()=>(<Grid 
    styleHeader={{backgroundColor:'pink'}}
    pivotOn='b'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  
  .addWithJSX('col data types, style headers all,pivot, with rowHeaderStyle',()=>(<Grid 
    styleHeader={{backgroundColor:'pink'}}
    styleRowHeader={{backgroundColor:'green'}}
    pivotOn='b'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  
  .addWithJSX('col data types, style headers by column',()=>(<Grid 
    styleHeader={{backgroundColor:'pink'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleHeader:{backgroundColor:'red'}},{key:'b',title:'col B',widePct:'15',styleHeader:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleHeader:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />)) 
  .addWithJSX('col data types, style headers by column with pivot',()=>(<Grid 
    styleHeader={{backgroundColor:'pink'}}
    styleRowHeader={{backgroundColor:'green'}}
    pivotOn='b'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleHeader:{backgroundColor:'red'}},{key:'b',title:'col B',widePct:'15',styleHeader:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleHeader:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, style cell',()=>(<Grid 
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, style cell by Column',()=>(<Grid 
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleCell:{backgroundColor:'pink'}},{key:'b',title:'col B',widePct:'15',styleCell:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleCell:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, style cell by Column, with pivot',()=>(<Grid 
    pivotOn='b'
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleCell:{backgroundColor:'pink'},easyBool:true},{key:'b',title:'col B',widePct:'15',styleCell:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleCell:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, style input',()=>(<Grid 
    styleInput={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleInput:{backgroundColor:'pink'}},{key:'b',title:'col B',widePct:'15',styleInput:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleInput:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col widths too big,scroll,padded',()=>(<Grid borderWide={15} padWide={15} data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))


  storiesOf('obj[], grid classNames', module)  
  .addWithJSX('col data types, class headers all',()=>(<Grid 
    classHeaderData='GreenRotate'
    classHeaderCell='BackgroundBlue'
    styleSelected={{backgroundColor:'lightgreen',fontWeight:'bold'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  
  .addWithJSX('col data types, class headers all,pivot',()=>(<Grid 
    classHeaderData='GreenRotate'
    classHeaderCell='BackgroundBlue'
    styleSelected={{backgroundColor:'lightgreen',fontWeight:'bold'}}
    pivotOn='r'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  
  .addWithJSX('col data types, class headers+rowHeaders all,pivot',()=>(<Grid 
    classHeaderData='GreenRotate'
    classHeaderCell='BackgroundBlue'
    classRowHeaderData='PinkRotate'
    classRowHeaderCell='BackgroundYellow'
    styleSelected={{backgroundColor:'lightgreen',fontWeight:'bold'}}
    pivotOn='r'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))  

  .addWithJSX('col data types, class headers by column',()=>(<Grid 
    classHeaderData='GreenRotate'
    classHeaderCell='BackgroundBlue'
    classRowHeaderData='PinkRotate'
    classRowHeaderCell='BackgroundYellow'
    classNameSelectedCell='testSelectedCellClass'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',classHeaderCell:'Gradient1',classHeaderData:'GreenRotate'},{key:'b',title:'col B',widePct:'15',classHeaderCell:'Gradient2',classHeaderData:'RedRotate'},{key:'c',title:'col C',widePct:'5',styleHeader:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />)) 
  .addWithJSX('col data types, class headers by column with pivot',()=>(<Grid 
    classHeaderData='GreenRotate'
    classHeaderCell='BackgroundBlue'
    classRowHeaderData='PinkRotate'
    classRowHeaderCell='BackgroundYellow'
    classNameSelectedCell='testSelectedCellClass'
    pivotOn='b'
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',classHeaderCell:'Gradient1',classHeaderData:'GreenRotate'},{key:'b',title:'col B',widePct:'15',classHeaderCell:'Gradient2',classHeaderData:'RedRotate'},{key:'c',title:'col C',widePct:'5',styleHeader:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))

  .addWithJSX('col data types, grid style cell',()=>(<Grid 
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, grid style cell+ column style cell',()=>(<Grid 
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleCell:{backgroundColor:'pink'}},{key:'b',title:'col B',widePct:'15',styleCell:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleCell:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  .addWithJSX('col data types, style cell by Column, with pivot',()=>(<Grid 
    pivotOn='b'
    styleCell={{backgroundColor:'teal'}}
    data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}
    columnList={[{key:'a',title:'col A',widePct:'15',styleCell:{backgroundColor:'pink'},easyBool:true},{key:'b',title:'col B',widePct:'15',styleCell:{backgroundColor:'green'}},{key:'c',title:'col C',widePct:'5',styleCell:{backgroundColor:'blue'}},{key:'d',title:'col D',widePct:'5',easyDate:true},{key:'r',title:'col R',easyDateTime:true}]} 
  />))
  


storiesOf('obj[] - small data,pivot', module)
.addWithJSX('numeric values',()=>(<Grid debugGridMath pivotOn='b' data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid debugGridMath  pivotOn='b' data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed',()=>(<Grid  debugGridMath pivotOn='b' data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid  debugGridMath pivotOn='b' data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid pivotOn='b' data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid pivotOn='b' data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('string values mixed,padded',()=>(<Grid borderWide={15} padWide={15} debugGridMath pivotOn='b' data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))

storiesOf('obj[] - small data,big grid,autoColWide', module)
.addWithJSX('numeric values super size',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid debugGridMath showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={100}  data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={400}  data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))

storiesOf('obj[] - small data,big grid,autoColWide,pivotOn', module)
.addWithJSX('numeric values super size',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid pivotOn='c' showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid pivotOn='c' showToolsAddCut gridHigh={400} gridWide={100}  data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid pivotOn='c' showToolsAddCut gridHigh={400} gridWide={400}  data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh padded',()=>(<Grid pivotOn='c'  borderWide={15} padWide={15} showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))


storiesOf('obj[] - medium data', module)
.addWithJSX('numeric values',()=>(<Grid data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))

storiesOf('obj[] - medium data,big grid,autoColWide', module)
.addWithJSX('numeric values super size',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={100}  data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={400}  data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))

storiesOf('array[] - small data', module)
.addWithJSX('numeric values',()=>(<Grid data={[[5,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[[0,5,6,8,90],[4,0,6,8,90],[3,5,0,8,90],[2,5,6,0,90],[1,5,6,8,0]]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[['asdf',5,6,8,90],[4,'qwer',6,8,90],[3,5,6,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq']]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[['asdf','',0,8,90],[4,'qwer',6,8,90],[3,'',0,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq']]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[[5,true,6,8,90],[4,false,6,8,90],[3,true,6,8,90],[2,false,6,8,90],[1,true,6,8,90]]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[[null,true,6,null,90],[4,false,6,8,90],[3,true,6,null,90],[2,false,6,8,90],[1,true,6,8,90]]}/>))
.addWithJSX('non-pivot sample data',()=>(<Grid data={[['a0','a1','a2','a3','a4'],['b0','b1','b2','b3','b4'],['c0','c1','c2','c3','c4'],['d0','d1','d2','d3','d4'],['e0','e1','e2','e3','e4'],['f0','f1','f2','f3','f4']]}/>))

storiesOf('array[] - small data, pivot', module)
.addWithJSX('numeric values',()=>(<Grid pivotOn='2' data={[[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51,52,53,54,55]]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid pivotOn='2' data={[[0,12,13,14,15],[21,0,23,24,25],[31,32,0,34,35],[41,42,43,0,45],[51,52,53,54,0]]}/>))
.addWithJSX('string values mixed',()=>(<Grid pivotOn='2' data={[['foo',12,13,14,15],[21,'bar',23,24,25],[31,32,'bally',34,35],[41,42,43,'froz',45],[51,52,53,54,'quux']]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid pivotOn={'0'} data={[['foo',12,13,14,''],[21,'bar',23,'',25],[31,32,'bally',34,35],[41,'',43,'froz',45],['',52,53,54,'quux']]}/>))
.addWithJSX('bool values mixed',()=>(<Grid pivotOn='1' data={[['foo',12,13,14,false],[21,'bar',23,true,25],[31,32,'bally',34,35],[41,false,43,'froz',45],[true,52,53,54,'quux']]}/>))
.addWithJSX('null values mixed',()=>(<Grid pivotOn='3' data={[[null,12,13,14,false],[21,null,23,true,25],[31,32,null,34,35],[41,false,43,null,45],[true,52,53,54,null]]}/>))
.addWithJSX('pivot sample on 0',()=>(<Grid pivotOn='0' data={[['a0','a1','a2','a3','a4'],['b0','b1','b2','b3','b4'],['c0','c1','c2','c3','c4'],['d0','d1','d2','d3','d4'],['e0','e1','e2','e3','e4'],['f0','f1','f2','f3','f4']]}/>))
.addWithJSX('pivot sample on 1',()=>(<Grid pivotOn='1' data={[['a0','a1','a2','a3','a4'],['b0','b1','b2','b3','b4'],['c0','c1','c2','c3','c4'],['d0','d1','d2','d3','d4'],['e0','e1','e2','e3','e4'],['f0','f1','f2','f3','f4']]}/>))
.addWithJSX('pivot sample on 2',()=>(<Grid pivotOn='2' data={[['a0','a1','a2','a3','a4'],['b0','b1','b2','b3','b4'],['c0','c1','c2','c3','c4'],['d0','d1','d2','d3','d4'],['e0','e1','e2','e3','e4'],['f0','f1','f2','f3','f4']]}/>))

storiesOf('array[] - small data,big grid,autoColWide', module)
.addWithJSX('numeric values super size',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[[5,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[[0,5,6,8,90],[4,0,6,8,90],[3,5,0,8,90],[2,5,6,0,90],[1,5,6,8,0]]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[['asdf',5,6,8,90],[4,'qwer',6,8,90],[3,5,6,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq']]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={100}  data={[['asdf','',0,8,90],[4,'qwer',6,8,90],[3,'',0,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq']]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={400}  data={[[5,true,6,8,90],[4,false,6,8,90],[3,true,6,8,90],[2,false,6,8,90],[1,true,6,8,90]]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[[null,true,6,null,90],[4,false,6,8,90],[3,true,6,null,90],[2,false,6,8,90],[1,true,6,8,90]]}/>))

storiesOf('array[] - medium data', module)
.addWithJSX('numeric values',()=>(<Grid data={[[5,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[[0,5,6,8,90],[4,0,6,8,90],[3,5,0,8,90],[2,5,6,0,90],[1,5,6,8,0],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[['asdf',5,6,8,90],[4,'qwer',6,8,90],[3,5,6,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq'],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[['asdf','',0,8,90],[4,'qwer',6,8,90],[3,'',0,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq'],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[[5,true,6,8,90],[4,false,6,8,90],[3,true,6,8,90],[2,false,6,8,90],[1,true,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[[null,true,6,null,90],[4,false,6,8,90],[3,true,6,null,90],[2,false,6,8,90],[1,true,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))

storiesOf('array[] - medium data,big grid,autoColWide', module)
.addWithJSX('numeric values super size',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[[5,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[[0,5,6,8,90],[4,0,6,8,90],[3,5,0,8,90],[2,5,6,0,90],[1,5,6,8,0],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[['asdf',5,6,8,90],[4,'qwer',6,8,90],[3,5,6,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq'],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={100}  data={[['asdf','',0,8,90],[4,'qwer',6,8,90],[3,'',0,'zxcv',90],[2,5,6,8,90],[1,5,6,8,'zaq'],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={400}  data={[[5,true,6,8,90],[4,false,6,8,90],[3,true,6,8,90],[2,false,6,8,90],[1,true,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[[null,true,6,null,90],[4,false,6,8,90],[3,true,6,null,90],[2,false,6,8,90],[1,true,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))




storiesOf('primitive[] data', module)
.addWithJSX('numeric primitives',()=>(<Grid data={[1,2,3,4]}/>))
.addWithJSX('numeric leading zero primitives',()=>(<Grid data={[0,1,2,3]}/>))
.addWithJSX('strings',()=>(<Grid data={['arnold','bernard','clementine','dolores']}/>))
.addWithJSX('boolean primitives',()=>(<Grid data={[true,false,true,false]}/>))
.addWithJSX('boolean leading false primitives',()=>(<Grid data={[false,true,false,true]}/>))

storiesOf('primitive[] - pivotOn', module)
.addWithJSX('numeric primitives',()=>(<Grid pivotOn data={[1,2,3,4]}/>))
.addWithJSX('numeric leading zero primitives',()=>(<Grid pivotOn data={[0,1,2,3]}/>))
.addWithJSX('strings',()=>(<Grid pivotOn data={['arnold','bernard','clementine','dolores']}/>))
.addWithJSX('boolean primitives',()=>(<Grid pivotOn data={[true,false,true,false]}/>))
.addWithJSX('boolean leading false primitives',()=>(<Grid pivotOn data={[false,true,false,true]}/>))

storiesOf('primitive[] - formatted', module)
.addWithJSX('numeric primitives - dollars',()=>(<Grid data={[1,2,3,4]} columnList={[{key:'data', title:'My List', easyDollar:true, }]}/>))
.addWithJSX('numeric primitives leading 0 - ints',()=>(<Grid data={[0,1,2,3]} columnList={[{key:'data', title:'My List', easyInt:true, }]}/>))
.addWithJSX('strings - edit disabled',()=>(<Grid data={['arnold','bernard','clementine','dolores']}  columnList={[{key:'data', title:'My List', editDisabled:true, }]}/>))
.addWithJSX('bool primitive - easyBool',()=>(<Grid data={[true,false,true,false]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))
.addWithJSX('bool primitive leading 0 - easyBool',()=>(<Grid data={[false,true,false,true]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))

storiesOf('primitive[] - sized', module)
.addWithJSX('numeric primitives',()=>(<Grid data={[1,2,3,4]} borderWide={15} padWide={15} />))
.addWithJSX('numeric leading zero primitives',()=>(<Grid data={[0,1,2,3]} borderWide={15} padWide={15} />))
.addWithJSX('strings',()=>(<Grid data={['arnold','bernard','clementine','dolores']} borderWide={15} padWide={15} />))
.addWithJSX('boolean primitives',()=>(<Grid data={[true,false,true,false]} borderWide={15} padWide={15} />))
.addWithJSX('boolean leading false primitives',()=>(<Grid data={[false,true,false,true]} borderWide={15} padWide={15} />))

storiesOf('primitive[] - sized,pivotOn', module)
.addWithJSX('numeric primitives',()=>(<Grid pivotOn data={[1,2,3,4]} borderWide={15} padWide={15} />))
.addWithJSX('numeric leading zero primitives',()=>(<Grid pivotOn data={[0,1,2,3]} borderWide={15} padWide={15} />))
.addWithJSX('strings',()=>(<Grid pivotOn data={['arnold','bernard','clementine','dolores']} borderWide={15} padWide={15} />))
.addWithJSX('boolean primitives',()=>(<Grid pivotOn data={[true,false,true,false]} borderWide={15} padWide={15} />))
.addWithJSX('boolean leading false primitives',()=>(<Grid pivotOn data={[false,true,false,true]} borderWide={15} padWide={15} />))

storiesOf('primitive[] - formatted,pivotOn', module)
.addWithJSX('numeric primitives - dollars',()=>(<Grid pivotOn data={[1,2,3,4]} columnList={[{key:'data', title:'My List', easyDollar:true, }]}/>))
.addWithJSX('numeric primitives leading 0 - ints',()=>(<Grid pivotOn data={[0,1,2,3]} columnList={[{key:'data', title:'My List', easyInt:true, }]}/>))
.addWithJSX('strings - edit disabled',()=>(<Grid pivotOn data={['arnold','bernard','clementine','dolores']}  columnList={[{key:'data', title:'My List', editDisabled:true, }]}/>))
.addWithJSX('bool primitive - easyBool',()=>(<Grid pivotOn data={[true,false,true,false]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))
.addWithJSX('bool primitive leading 0 - easyBool',()=>(<Grid pivotOn data={[false,true,false,true]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))

storiesOf('text mode edit', module)
.addWithJSX('numeric object values',()=>(<Grid editAsText data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric array values',()=>(<Grid editAsText data={[[5,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90],[4,5,6,8,90],[3,5,6,8,90],[2,5,6,8,90],[1,5,6,8,90]]}/>))
.addWithJSX('numeric prim values',()=>(<Grid editAsText data={[0,1,2,3,4,5,6,7,8,9,0,1]}/>))
.addWithJSX('hide header',()=>(<Grid colHeaderHide editAsText data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('show tools',()=>(<Grid editAsText showToolsAddCut showToolsPage data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('sizing',()=>(<Grid editAsText  borderWide={15} padWide={15} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))



storiesOf('Easy Tools - EasyBool', module)
.addWithJSX('EasyBool interactive', () => (  <div style={{ border: '1px dashed green', width: '50%' }}><WrapperEasyBool x={5} y={6} objKey='keyName' id='myId'/></div>))  
.addWithJSX('EasyBool interactive text', () => (  <div style={{ border: '1px dashed green', width: '50%' }}>    <WrapperEasyBool      x={5} y={6} objKey='keyName' trueText='yep' falseText='nope' id='myId'            />  </div>))  
.addWithJSX('EasyBool true with text', () => (    <div style={{ border: '1px dashed green', width: '50%' }}>      <EasyBool        x={5} y={6} objKey='keyName' cellData={true} trueText='yep' falseText='nope' id='myId'        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}      />    </div>  ))
.addWithJSX('EasyBool false with text', () => (      <div style={{ border: '1px dashed green', width: '50%' }}>        <EasyBool          x={5} y={6} objKey='keyName' cellData={false} trueText='yep' falseText='nope' id='myId'          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}        />      </div>  ))  
.addWithJSX('EasyBool true with text styled', () => (    <div style={{ border: '1px dashed green', width: '50%' }}>      <EasyBool        x={5} y={6}     objKey='keyName' cellData={true}         trueText='yep'  falseText='nope'         id='myId'       style={{textAlign:'center'}}        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}      />    </div>  ))    
.addWithJSX('EasyBool false with text styled', () => (    <EasyBool      x={5} y={6} objKey='keyName' cellData={false}       trueText='yep' falseText='nope'       id='myId'  style={{textAlign:'center'}}      onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}    />  ))
.addWithJSX('EasyBool true with icon', () => (      <EasyBool        x={5} y={6} objKey='keyName' cellData={true}         id='myId'        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}      />  ))
.addWithJSX('EasyBool false with icon', () => (      <div style={{ border: '1px dashed green', width: '50%' }}>        <EasyBool          x={5} y={6} objKey='keyName' cellData={false} id='myId'          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}        />      </div>  ))  
.addWithJSX('EasyBool true with icon external style centered', () => (    <div style={{ border: '1px dashed green', width: '50%' }}>      <EasyBool        x={5} y={6} objKey='keyName' cellData={true} id='myId' style={{margin:'0 auto'}}        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}      />    </div> ))
.addWithJSX('EasyBool false with icon style centered', () => (      <div style={{ border: '1px dashed green', width: '50%' }}>        <EasyBool          x={5} y={6} objKey='keyName' cellData={false} id='myId' style={{margin:'0 auto'}}          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}        />      </div>  ))  

;  