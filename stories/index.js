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

storiesOf('Primitive array data', module)
.addWithJSX('numeric primitives',()=>(<Grid data={[1,2,3,4]}/>))
.addWithJSX('numeric leading zero primitives',()=>(<Grid data={[0,1,2,3]}/>))
.addWithJSX('strings',()=>(<Grid data={['arnold','bernard','clementine','dolores']}/>))
.addWithJSX('boolean primitives',()=>(<Grid data={[true,false,true,false]}/>))
.addWithJSX('boolean leading false primitives',()=>(<Grid data={[false,true,false,true]}/>))

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