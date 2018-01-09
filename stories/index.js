import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Grid  from '../src/index.js';

storiesOf('Button', module)
  .add('first try', () => (
    <div style={{border:'1px solid green',width:'50%'}}>
    <Grid rowCount={500} 
          rowHeight={22} 
          rowHeaderHeight={35} 
          gridHeight={300}
          borderWidth={5}
          data={[{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4}]}
    />
    </div>
  ))
;  