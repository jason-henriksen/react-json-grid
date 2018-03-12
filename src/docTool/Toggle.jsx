import React from 'react';
import autoBind from 'react-autobind';
import CheckEmpty from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckFull from 'mdi-react/CheckboxMarkedOutlineIcon';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';



@observer class Toggle extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable isShowingHelp = false;
  @action toggleHelpOn() { this.isShowingHelp = !this.isShowingHelp; }
  @action toggleHelpOff() { console.log('-'); this.isShowingHelp = false; }

  render() {    
    var rval = 'rotate(90deg)';
    if(this.props.toggleValue){rval='rotate(00deg)';}
    var helpDisplay = { transition: '0.1s', height: '0px', marginLeft: '15px', overflow: 'hidden' };
    if (this.isShowingHelp) { helpDisplay = { transition: '0.1s', height: '75px', marginLeft: '15px', overflow: 'hidden' } }
    
  
    return (
    <div>      
      <div onClick={this.props.action} style={{display: 'flex',alignItems:'center'}}>
        <div style={{ display: 'inline-block', minWidth: '175px', font: '16px monospace', cursor: 'help' }} onClick={this.toggleHelpOn} >{this.props.label}</div>
        <div style={{verticalAlign:'middle',display: 'inline-block',transform: rval,transition: '0.2s'}}>
          {this.props.toggleValue?<CheckFull style={{marginLeft:'2px'}}/>:<CheckEmpty style={{marginRight:'2px'}}/>}
        </div>&nbsp;
      </div>
      <div style={helpDisplay}>{this.props.help}</div>
    </div >      
    );
  }
}


export default Toggle;