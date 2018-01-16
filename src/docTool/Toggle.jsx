import React from 'react';
import autoBind from 'react-autobind';


class Toggle extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  render() {    
    return (
      <div>
        <div style={{ width: '50%', display: 'inline-block' }}>{this.props.label}</div>
        &nbsp;<button onClick={this.props.action}>Toggle</button>&nbsp;{""+this.props.toggleValue}
      </div>
    );
  }
}


export default Toggle;