import React from 'react';
import autoBind from 'react-autobind';


class TextParam extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  render() {    
    return (
      <div>
        <div style={{ width: '50%', display: 'inline-block' }}>{this.props.label}</div>
        &nbsp;<input onChange={this.props.action} value={this.props.curValue}/>
      </div>
    );
  }
}


export default TextParam;