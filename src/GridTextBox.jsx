import React from 'react';
import PropTypes from 'prop-types';
import { observable,action,trace } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

// Wrapper for the grid
// This grid allows deep styling via style objects, 
// but retains control of border and padding to ensure that the grid lines up.
@observer class GridTextBox extends React.Component 
{

  @observable txt = '';              // keep track of how wide the scroll bar will be
  
  constructor(props) { 
    super(props); 
    autoBind(this); 
    this.componentWillReceiveProps(props);    // first call needs to set up the data store
  }

  componentWillReceiveProps(nextProps)
  {
    var testTxt = this.props.GridStore.convertJSONtoTXT(nextProps.data);
    if(this.txt!==testTxt){
      this.txt=testTxt; // don't set the value unless you have to, it will move the cursor!
    }
  }
  

  onChange(evt){
    var curText = evt.target.value;
    this.props.GridStore.convertTXTtoJSON(curText);
  }
  
  render(){
    return(
      <textarea style={{width:this.props.uiMath.gridWide,height:this.props.uiMath.gridHigh}} onChange={this.onChange} value={this.txt}>
        
      </textarea>
    );
  }
}

export default GridTextBox;
