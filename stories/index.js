import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/index.js';
import  DocUI  from '../src/docTool/DocUI';
import EasyBool from '../src/easyTools/EasyBool';
import WrapperEasyBool from './WrapperEasyBool';

import DataNoiseMed from './dataNoiseMedium.js'
import DataNoiseSmall from './dataNoiseSmall.js'
import DataNoiseGiant from './dataNoiseGiant.js'

storiesOf('Grid', module)
  .add('DocUI', () => (<DocUI/>))
;



storiesOf('Easy Tools - EasyBool', module)

.add('EasyBool true with text', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <EasyBool
        x={5} y={6} objKey='keyName' cellData={true} trueText='yep' falseText='nope' id='myId'
        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
      />
    </div>
  ))
  .add('EasyBool false with text', () => (
      <div style={{ border: '1px dashed green', width: '50%' }}>
        <EasyBool
          x={5} y={6} objKey='keyName' cellData={false} trueText='yep' falseText='nope' id='myId'
          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
        />
      </div>
  ))
  .add('EasyBool true with text styled', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <EasyBool
        x={5} y={6} objKey='keyName' cellData={true} trueText='yep' falseText='nope' id='myId'  style={{textAlign:'center'}}
        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
      />
    </div>
  ))
  .add('EasyBool false with text  styled', () => (
      <div style={{ border: '1px dashed green', width: '50%' }}>
        <EasyBool
          x={5} y={6} objKey='keyName' cellData={false} trueText='yep' falseText='nope' id='myId'  style={{textAlign:'center'}}
          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
        />
      </div>
  ))
  
  .add('EasyBool true with icon', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <EasyBool
        x={5} y={6} objKey='keyName' cellData={true} id='myId'
        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
      />
    </div>
  ))
  .add('EasyBool false with icon', () => (
      <div style={{ border: '1px dashed green', width: '50%' }}>
        <EasyBool
          x={5} y={6} objKey='keyName' cellData={false} id='myId'
          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
        />
      </div>
  ))
  .add('EasyBool true with icon external style centered', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <EasyBool
        x={5} y={6} objKey='keyName' cellData={true} id='myId' style={{margin:'0 auto'}}
        onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
      />
    </div>
  ))
  .add('EasyBool false with icon style centered', () => (
      <div style={{ border: '1px dashed green', width: '50%' }}>
        <EasyBool
          x={5} y={6} objKey='keyName' cellData={false} id='myId' style={{margin:'0 auto'}}
          onChange={(x, y, objKey, val) => { window.alert(x, y, objKey, val); }}
        />
      </div>
  ))
  .add('EasyBool interactive default text', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <WrapperEasyBool
        x={5} y={6} objKey='keyName' id='myId'        
      />
    </div>
  ))  
  .add('EasyBool interactive text', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <WrapperEasyBool
        x={5} y={6} objKey='keyName' trueText='yep' falseText='nope' id='myId'        
      />
    </div>
  ))  
  
;  