import React from 'react';
import autoBind from 'react-autobind';


class NumWheel extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  defVal() { this.props.action(-1); } // account for rounding error
  moreVal() { this.props.action(this.props.curValue + this.props.incr); } // account for rounding error
  more1() {    this.props.action(this.props.curValue + 1);  }
  more5() {    this.props.action(this.props.curValue + 5);  }
  lessVal() { 
    if (this.props.curValue - this.props.incr < -1) return;
    this.props.action(this.props.curValue - this.props.incr); 
  } // account for rounding error
  less1() {
    if (this.props.curValue - 1 < -1) return;
    this.props.action(this.props.curValue - 1);
  } // account for rounding error
  less5() {
    if (this.props.curValue - 5 < -1) return;
    this.props.action(this.props.curValue - 5);
  } // account for rounding error

  render() {

    var displayVal = this.props.curValue;
    if (-1 === displayVal) { displayVal='default'; }

    var res = '';
    if(this.props.incr){
      res = <div>
        <div style={{ width: '30%', display: 'inline-block' }}>{this.props.label}</div>
        <button onClick={this.defVal}>X</button>
        <button onClick={this.lessVal}>-{''+this.props.incr}</button>
        <button onClick={this.lessVal}>+{'' + this.props.incr}</button>&nbsp;{displayVal}
      </div>
    }
    else{
      res = <div>
        <div style={{ width: '30%', display: 'inline-block' }}>{this.props.label}</div>
        <button onClick={this.defVal}>X</button>
        <button onClick={this.less5}>-5</button>
        <button onClick={this.less1}>-</button>
        <button onClick={this.more1}>+</button>
        <button onClick={this.more5}>+5</button>&nbsp;{displayVal}
      </div>
    }

    return (
      res
    );
  }
}


export default NumWheel;