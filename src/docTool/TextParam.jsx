import React from 'react';
import autoBind from 'react-autobind';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


@observer class TextParam extends React.Component {
  constructor(props) { 
    super(props); 
    autoBind(this); 
    this.holdVal='';

  }

  @observable isShowingHelp=false;
  @action toggleHelpOn(){ this.isShowingHelp=!this.isShowingHelp; }
  @action toggleHelpOff(){ this.isShowingHelp=false; }

  @action onmouseenter(){
    this.holdVal = this.props.curValue;
    var fakeEvt={};
    fakeEvt.target={};
    fakeEvt.target.value=this.props.mouseOverValue;
    if(this.props.mouseOverValue && this.props.action){ this.props.action(fakeEvt); }    
  }
  @action onmouseleave(){
    var fakeEvt={};
    fakeEvt.target={};
    fakeEvt.target.value=this.holdVal;
    if(this.props.mouseOverValue && this.props.action){this.props.action(fakeEvt);}
  }
  
  

  render() {    
    var helpDisplay={transition:'0.1s',height:'0px',marginLeft:'15px',overflow:'hidden'};
    if(this.isShowingHelp){ helpDisplay={transition:'0.1s',height:'75px',marginLeft:'15px',overflow:'hidden'}}
    
    return (
      <div>
        <div style={{verticalAlign: 'middle',lineHeight:'normal',display: 'flex',alignItems:'center'}}>
          <div style={{display:'inline-block',minWidth:'175px',font:'16px monospace',cursor:'help'}} 
               onClick={this.toggleHelpOn} onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} >{this.props.label}</div>
          <input style={{display: 'inline-block',width:'200px',verticalAlign:'middle' }} onChange={this.props.action} value={this.props.curValue}/>
        </div>
        <div style={helpDisplay}>{this.props.help}</div>
      </div>
        
    );
  }
}


export default TextParam;