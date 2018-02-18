import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';



class EasyBool extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  toggle(){
    console.log('eb toggle');
    if(this.props.cellData){
      this.props.onChange( this.props.x, this.props.y, this.props.objKey, false);
    }
    else{
      this.props.onChange(this.props.x, this.props.y, this.props.objKey, true);
    }
  }

  render() {

    var rendVal = '';
    if(this.props.cellData){
      rendVal = this.props.trueText || 'true';
    }
    else{
      rendVal = this.props.falseText || 'false';
    }

    return (
      <div id={this.props.id} onClick={this.toggle}>{rendVal}</div>
    );
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