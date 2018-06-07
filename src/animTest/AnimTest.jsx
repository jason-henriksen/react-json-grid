import React from 'react';
import autoBind from 'react-autobind';

import { observable } from 'mobx';
import { observer } from 'mobx-react';


@observer class AnimTest extends React.Component 
{
  constructor(props) { 
    super(props); 
    autoBind(this); 
  }
  @observable x = 50;
  @observable y = 50;
  @observable rot = 0;

  click(evt){
    this.x=evt.clientX-10-20;
    this.y = evt.clientY-10-20;
  }

  move(evt) {
    var cx = this.x+30;
    var cy = this.y+30;
    var ex = evt.clientX;
    var ey = evt.clientY;
    var n = ey-cy;
    var d = ex-cx;
    this.rot = (Math.atan(n/(d||0.0001)) * 180/Math.PI);
    if(ex>cx){ this.rot+=180; }
    this.rot-=90;
  }
  
  render() {

    return (
      <div 
        onClick={this.click}
        onMouseMove={this.move}
        style={{
          position: 'absolute', top: '10px', left: '10px', bottom: '10px', right: '10px', 
          backgroundColor: 'tan',
          border: '3px solid black',        
        }}>
        Click to move the box.
          <div id='moveable' style={{
            position: 'absolute', top: this.y + 'px', left: this.x +'px', width: '30px', height: '30px',
            backgroundColor: 'green',
            border: '3px solid black',
            borderTop:'3px solid grey',
            borderRadius:'10px',
            transform: 'rotate('+this.rot+'deg)',
            transition:'top 1s, left 1s',
            transformOrigin:'50% 50%'
        }}/>
      </div>
    );
  }
}


export default AnimTest;

