import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/index.js';
import  DocUI  from '../src/docTool/DocUI';
import DataNoiseMed from './dataNoiseMedium.js'
import DataNoiseSmall from './dataNoiseSmall.js'
import DataNoiseGiant from './dataNoiseGiant.js'

storiesOf('Button', module)
.add('DocUI', () => (
      <DocUI/>
    ))
    .add('minimal read only grid', () => (
    <div style={{border:'1px dashed green',width:'50%'}}>
    <Grid rowCount={500} 
          rowHeight={22} 
          colHeaderHeight={35} 
          gridHeight={300}
          borderWidth={1}
          data={DataNoiseMed}
    />
    </div>
  ))

  .add('minimal read only grid - wide borders', () => (
      <div style={{border:'1px dashed green',width:'50%'}}>
      <Grid rowCount={500} 
            rowHeight={22} 
            colHeaderHeight={35} 
            gridHeight={300}
            borderWidth={5}
            data={DataNoiseMed}
      />
      </div>
    ))

    .add('minimal read only grid - zero padding', () => (
      <div style={{border:'1px dashed green',width:'50%'}}>
      <Grid rowCount={500} 
            rowHeight={22} 
            colHeaderHeight={35} 
            gridHeight={300}
            borderWidth={1}
            data={DataNoiseMed}
      />
      </div>
    ))
    
storiesOf('Button', module)
  .add('small data', () => (
    <div style={{ border: '1px dashed white', width: '50%' }}>
      <Grid rowCount={500}
        rowHeight={22}
        colHeaderHeight={35}
        gridHeight={300}
        borderWidth={1}
        data={DataNoiseSmall}
      />
    </div>
  ))

storiesOf('Button', module)
  .add('empty data', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <Grid rowCount={500}
        rowHeight={22}
        colHeaderHeight={35}
        gridHeight={300}
        borderWidth={1}
        data={[]}
      />
    </div>
  ))
  
;  