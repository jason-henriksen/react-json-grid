import React from 'react';
import autoBind from 'react-autobind';


class TextParam extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  render() {    
    return (
      <div >
        <div style={{display: 'inline-block',minWidth:'125px',verticalAlign:'middle' }}>{this.props.label}&nbsp;</div>
        <input style={{display: 'inline-block',width:'200px',verticalAlign:'middle' }} onChange={this.props.action} value={this.props.curValue}/>
      </div>
    );
  }
}


export default TextParam;