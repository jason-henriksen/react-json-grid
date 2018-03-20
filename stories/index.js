import React from 'react';
import { setAddon,storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/Grid';
import  DocUI  from '../src/docTool/DocUI';
import EasyBool from '../src/easyTools/EasyBool';
import WrapperEasyBool from './WrapperEasyBool';

import DataNoiseMed from './dataNoiseMedium.js'
import DataNoiseSmall from './dataNoiseSmall.js'
import DataNoiseGiant from './dataNoiseGiant.js'

import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

storiesOf('Grid', module)
  .addWithJSX('Interactive Documentation', () => (<DocUI/>))
;

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

storiesOf('object[] - small data', module)
.addWithJSX('numeric values',()=>(<Grid data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))

storiesOf('object[] - small data,column def sizes', module)
.addWithJSX('col widths px,noScroll,missing defs',()=>(<Grid gridHighCollapse={false} showToolsAddCut 
                                columnList={[{key:'a',title:'col A',widePct:'75'},{key:'b',title:'col B',widePct:'10'},{key:'c',title:'col C',widePct:'5'}]} 
                                data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths pcs,noScroll,all defs',()=>(<Grid  gridHighCollapse={false} showToolsAddCut 
                                columnList={[{key:'a',title:'col A',widePct:'15'},{key:'b',title:'col B',widePct:'15'},{key:'c',title:'col C',widePct:'5'},{key:'d',title:'col D',widePct:'5'},{key:'r',title:'col R'}]} 
                                data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths mix,noScroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths too big,noScroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths px,scroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths pcs,scroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths mix,scroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('col widths too big,scroll',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))


storiesOf('object[] - small data,pivot', module)
.addWithJSX('numeric values',()=>(<Grid pivotOn='b' data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid pivotOn='b' data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed',()=>(<Grid pivotOn='b' data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid pivotOn='b' data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid pivotOn='b' data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid pivotOn='b' data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))

storiesOf('object[] - small data,big grid,autoColWide', module)
.addWithJSX('numeric values super size',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={100}  data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid showToolsAddCut gridHigh={400} gridWide={400}  data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))

storiesOf('object[] - small data,big grid,autoColWide,pivotOn', module)
.addWithJSX('numeric values super size',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={800} gridWide={800} data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros bad tiny',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={40} gridWide={40}  data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0}]}/>))
.addWithJSX('string values mixed wide fullHigh',()=>(<Grid pivotOn='c' showToolsAddCut  gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('empty string values mixed narrow',()=>(<Grid pivotOn='c' showToolsAddCut gridHigh={400} gridWide={100}  data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'}]}/>))
.addWithJSX('bool values mixed collapsed',()=>(<Grid pivotOn='c' showToolsAddCut gridHigh={400} gridWide={400}  data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed fullHigh',()=>(<Grid pivotOn='c' showToolsAddCut gridHighCollapse={false} gridHigh={400} gridWide={400}  data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90}]}/>))

storiesOf('object[] - medium data', module)
.addWithJSX('numeric values',()=>(<Grid data={[{r:5,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('numeric values with zeros',()=>(<Grid data={[{r:0,a:5,b:6,c:8,d:90},{r:4,a:0,b:6,c:8,d:90},{r:3,a:5,b:0,c:8,d:90},{r:2,a:5,b:6,c:0,d:90},{r:1,a:5,b:6,c:8,d:0},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('string values mixed',()=>(<Grid data={[{r:'asdf',a:5,b:6,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:5,b:6,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('empty string values mixed',()=>(<Grid data={[{r:'asdf',a:'',b:0,c:8,d:90},{r:4,a:'qwer',b:6,c:8,d:90},{r:3,a:'',b:0,c:'zxcv',d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:'zaq'},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('bool values mixed',()=>(<Grid data={[{r:5,a:true,b:6,c:8,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:8,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))
.addWithJSX('null values mixed',()=>(<Grid data={[{r:null,a:true,b:6,c:null,d:90},{r:4,a:false,b:6,c:8,d:90},{r:3,a:true,b:6,c:null,d:90},{r:2,a:false,b:6,c:8,d:90},{r:1,a:true,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90},{r:4,a:5,b:6,c:8,d:90},{r:3,a:5,b:6,c:8,d:90},{r:2,a:5,b:6,c:8,d:90},{r:1,a:5,b:6,c:8,d:90}]}/>))

storiesOf('object[] - medium data,big grid,autoColWide', module)
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
.addWithJSX('numeric primitives - dollars',()=>(<Grid data={[1,2,3,4]} columnList={[{key:'data', title:'My List', easyMoneyDollar:true, }]}/>))
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
.addWithJSX('numeric primitives - dollars',()=>(<Grid pivotOn data={[1,2,3,4]} columnList={[{key:'data', title:'My List', easyMoneyDollar:true, }]}/>))
.addWithJSX('numeric primitives leading 0 - ints',()=>(<Grid pivotOn data={[0,1,2,3]} columnList={[{key:'data', title:'My List', easyInt:true, }]}/>))
.addWithJSX('strings - edit disabled',()=>(<Grid pivotOn data={['arnold','bernard','clementine','dolores']}  columnList={[{key:'data', title:'My List', editDisabled:true, }]}/>))
.addWithJSX('bool primitive - easyBool',()=>(<Grid pivotOn data={[true,false,true,false]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))
.addWithJSX('bool primitive leading 0 - easyBool',()=>(<Grid pivotOn data={[false,true,false,true]} columnList={[{key:'data', title:'My List', easyBool:true, }]}/>))


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