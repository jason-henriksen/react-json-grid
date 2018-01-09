import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/index.js';
import DataNoiseMed from './dataNoiseMedium.js'
import DataNoiseSmall from './dataNoiseSmall.js'
import DataNoiseGiant from './dataNoiseGiant.js'

storiesOf('Button', module)
  .add('first try', () => (
    <div style={{border:'1px dashed green',width:'50%'}}>
    <Grid rowCount={500} 
          rowHeight={22} 
          rowHeaderHeight={35} 
          gridHeight={300}
          borderWidth={1}
          data={DataNoiseMed}
    />
    </div>
  ))

storiesOf('Button', module)
  .add('small data', () => (
    <div style={{ border: '1px dashed green', width: '50%' }}>
      <Grid rowCount={500}
        rowHeight={22}
        rowHeaderHeight={35}
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
        rowHeaderHeight={35}
        gridHeight={300}
        borderWidth={1}
        data={[]}
      />
    </div>
  ))
  
;  