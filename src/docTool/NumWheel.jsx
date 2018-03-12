import React from 'react';
import autoBind from 'react-autobind';

import ArrowLeftThick from 'mdi-react/ArrowLeftThickIcon';
import ArrowRightThick from 'mdi-react/ArrowRightThickIcon';
import ArrowLeft from 'mdi-react/ArrowLeftIcon';
import ArrowRight from 'mdi-react/ArrowRightIcon';
import CloseOctagonOutline from 'mdi-react/CloseOctagonOutlineIcon';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


@observer class NumWheel extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable isShowingHelp=false;
  @action toggleHelpOn(){ this.isShowingHelp=!this.isShowingHelp; }
  @action toggleHelpOff(){ console.log('-');this.isShowingHelp=false; }

  defVal() { this.props.action(-1); } // account for rounding error

  more1() {        
    this.props.action(this.props.curValue + 1);  
  }
  moreVal() {    
    if(this.props.curValue===-1){    this.props.action(this.props.incr||5);return;} // make nice round increments
    this.props.action(this.props.curValue + (this.props.incr||5));  
  }

  less1() {
    if (this.props.curValue - 1 < -1){
      this.props.action(-1);
      return;
    }
    this.props.action(this.props.curValue - 1);
  } // account for rounding error
  lessVal() {
    if ((this.props.curValue - (this.props.incr||5)) <= 0) {
      this.props.action(-1)
      return;
    };
    
    this.props.action(this.props.curValue - (this.props.incr||5));
  } // account for rounding error

  render() {

    var displayVal = this.props.curValue;
    if (-1 === displayVal) { displayVal='-'; }
    var helpDisplay={transition:'0.1s',height:'0px',marginLeft:'15px',overflow:'hidden'};
    if(this.isShowingHelp){ helpDisplay={transition:'0.1s',height:'75px',marginLeft:'15px',overflow:'hidden'}}

    return( 
    <div>
      <div style={{verticalAlign: 'middle',lineHeight:'normal',display: 'flex',alignItems:'center'}}>
        <div style={{display:'inline-block',minWidth:'175px',font:'16px monospace',cursor:'help'}} onClick={this.toggleHelpOn} >{this.props.label}</div>
        <CloseOctagonOutline onClick={this.defVal}/>
        <ArrowLeftThick onClick={this.lessVal}/>
        <ArrowLeft onClick={this.less1}/>
        <div style={{display:'inline-block',minWidth:'40px',textAlign:'center'}}>{displayVal}</div>
        <ArrowRight onClick={this.more1}/> 
        <ArrowRightThick onClick={this.moreVal}/> 
      </div>
      <div style={helpDisplay}>{this.props.help}</div>
    </div>
    );
  }
}


export default NumWheel;