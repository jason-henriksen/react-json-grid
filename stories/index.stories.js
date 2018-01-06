import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Grid from '../src/index';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Grid', module)
  .add('with text', () => <Grid title='foo'/>)
  .add('with no text', () => <Grid />)
  .add('with sizing', () => <div style={{border:'1px solid green',width:'50%'}}><Grid /></div>)
  .add('with min data', () => <div style={{border:'1px solid green',width:'50%'}}>
    <Grid rowCount={500} 
          rowHeight={22} 
          rowHeaderHeight={35} 
          gridHeight={300}
          data={[{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4}]}
    />
  </div>)  
  
