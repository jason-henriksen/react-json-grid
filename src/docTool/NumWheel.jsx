import React from 'react';
import autoBind from 'react-autobind';

import ArrowLeftThick from 'mdi-react/ArrowLeftThickIcon';
import ArrowRightThick from 'mdi-react/ArrowRightThickIcon';
import CloseOctagonOutline from 'mdi-react/CloseOctagonOutlineIcon';




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
    if (-1 === displayVal) { displayVal='-'; }

    var res = '';
    if(this.props.incr){
      res = <div>
      <div style={{ width: '30%', display: 'inline-block' }}>{this.props.label}</div>
        <CloseOctagonOutline onClick={this.defVal}/>
        <ArrowLeftThick onClick={this.lessVal}/>
        {displayVal}
        <ArrowRightThick onClick={this.moreVal}/> 
      </div>
    }
    else{
      res = 
      <div style={{userSelect: 'none',height:'28px',marginTop:'2px'}}>
        <CloseOctagonOutline onClick={this.defVal} style={{verticalAlign:'middle'}}/>
        <ArrowLeftThick onClick={this.less1} style={{verticalAlign:'middle'}}/>
        <div style={{ display: 'inline-block',verticalAlign:'middle'}}>{displayVal}</div>
        <ArrowRightThick onClick={this.more1} style={{verticalAlign:'middle'}}/> 
        <div style={{ display: 'inline-block',verticalAlign:'middle' }}>{this.props.label}</div>
      </div>
    }

    return (
      res
    );
  }
}


export default NumWheel;