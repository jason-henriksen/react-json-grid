import React from 'react';
import autoBind from 'react-autobind';
import CheckEmpty from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckFull from 'mdi-react/CheckboxMarkedOutlineIcon';
//import CheckEmpty from 'mdi-react/CheckCircleOutlineIcon';
//import CheckFull from 'mdi-react/CheckboxBlankCircleOutlineIcon';


class Toggle extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  render() {    
    var rval = 'rotate(90deg)';
    if(this.props.toggleValue){rval='rotate(00deg)';}
  
    return (
      <div onClick={this.props.action} style={{display: 'flex',alignItems:'center'}}>
        <div style={{verticalAlign:'middle',display: 'inline-block',minWidth:'125px'}}>{this.props.label}</div>
        <div style={{verticalAlign:'middle',display: 'inline-block',transform: rval,transition: '0.2s'}}>
          {this.props.toggleValue?<CheckFull style={{marginLeft:'2px'}}/>:<CheckEmpty style={{marginRight:'2px'}}/>}
        </div>&nbsp;
      </div>
    );
  }
}


export default Toggle;