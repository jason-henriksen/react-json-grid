import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import CheckEmpty from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckFull from 'mdi-react/CheckboxMarkedOutlineIcon';


class EasyBool extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  toggle(){
    if(this.props.cellData){
      this.props.onChange( this.props.x, this.props.y, this.props.objKey, false);
    }
    else{
      this.props.onChange(this.props.x, this.props.y, this.props.objKey, true);
    }
  }

  render() {
    if(this.props.trueText){

      var rtext = this.props.cellData?(this.props.trueText||'true'):(this.props.falseText||'false');

      return( <div  onClick={this.toggle} 
                    id={this.props.id} 
                    style={{...this.props.style}}
                    >{rtext}</div>);
    }
    else{
      var rval = 'scale(0.8) rotate(90deg) ';
      if(this.props.cellData || this.props.trueText || this.props.falseText ){rval='scale(0.8) rotate(00deg)';} // don't rotate selected, or when text is set.

      return (
        <div  onClick={this.toggle} id={this.props.id} style={{...this.props.style,marginTop:'-4px',width:'24px',transform: rval,transition: '0.2s'}}>{this.props.cellData?
              (this.props.trueText ||<CheckFull/>):
              (this.props.falseText ||<CheckEmpty/>) }</div>      
      );
    }
  }
}

// Proptypes
EasyBool.propTypes = {
  trueText: PropTypes.string,
  falseText: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  objKey: PropTypes.string.isRequired,
  cellData: PropTypes.any.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default EasyBool;