import React from 'react';
import autoBind from 'react-autobind';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import FilterIcon from 'mdi-react/FilterVariantIcon';



@observer class MenuPickerOverlay extends React.Component {
  constructor(props) { 
    super(props); 
    // this prevents problems with bad key values.  When switching frmo one grid to another in a tab frame, while the overlay is open the overlay div could stay in place, which is wrong.
    this.semiUniqueKey = Math.random();
    autoBind(this); 
  }

  blackHole(evt){}

  @observable filterText = '';
  @action changeFilter(evt){ this.filterText = evt.target.value; }

  endEdit()
  {  
    this.props.GridStore.cursor.editX = -1;
    this.props.GridStore.cursor.editY = -1;
    this.props.GridStore.showMenuPicker = false;
  }

  updateValue(evt,val){
    this.props.GridStore.curEditingValue = val;
    this.props.GridStore.onChangePivotWrapper(this.props.GridStore.cursor.editX, this.props.GridStore.cursor.editY, this.props.GridStore.cursor.editObjKey, this.props.GridStore.curEditingValue);    
    this.endEdit();
  }


  render() {
    var editVal = this.props.GridStore.curEditingValue||'';
    var saneThis=this;

    var itemList=[];
    var listTarget = this.props.GridStore.colDefListByKey[this.props.GridStore.cursor.editObjKey].easyMenu;
    if (listTarget.length){  // it's an array
      // JJH Needs a storybook test
      itemList = listTarget.map((item,index) => { 
        if(''===this.filterText.trim() || (''+item).indexOf(this.filterText)!==-1){
          return (
            <div key={'gridMenu'+index} id={'gridMenu'+index} style={{ padding: '2px',borderBottom:'1px solid lightgrey',paddingLeft:'15px' }} 
             onClick={(e)=>saneThis.updateValue(e,item)}>{item}</div>
          );
        }
        else{
          return null;
        }
      });
    }
    else{  // or it's a pipe delimited string
      listTarget = ''+listTarget;
      itemList = listTarget.split('|').map((item,index) => { 
        if(''===this.filterText.trim() || (''+item).indexOf(this.filterText)!==-1){        
          return (
            <div key={'gridMenu'+index} id={'gridMenu'+index} style={{ padding: '2px',borderBottom:'1px solid lightgrey',paddingLeft:'15px' }} 
               onClick={(e)=>saneThis.updateValue(e,item)}>{item}</div>);
        } 
        else{
          return null;
        }
      });
    }

    return (
      <div key={this.semiUniqueKey}>
        <div style={{position:'absolute',top:'0px',bottom:'0px',left:'0px',width:(this.props.uiMath.rowWide+2)+'px',backgroundColor:'grey',zIndex:'20',opacity:'0.7'}} onClick={this.endEdit} />
        <div style={{position: 'absolute', top: '15px', left: '15px', width: (this.props.uiMath.rowWide - 50) + 'px', height: (this.props.uiMath.gridHigh-30),zIndex:'30'}}>
          <span style={{float:'right',marginRight:'15px'}}><input type='text' onChange={this.changeFilter} value={this.filterText} style={{backgroundColor:'white'}}/></span>
        </div>
        <div style={{position: 'absolute', top: '15px', left:(this.props.uiMath.rowWide-70)+'px',zIndex:'35'}}><FilterIcon  width={18} height={18}/></div>
        
        <div style={{position: 'absolute', top: '35px', left: '15px', 
                     width: (this.props.uiMath.rowWide - 50) + 'px', height: (this.props.uiMath.gridHigh-70),
                     border:'1px solid grey',borderRadius:'5px',overflow:'hidden',
                     backgroundColor:'white',zIndex:'30'}}>{/* scroll bar to not mess up rounded edge */}
          <div style={{position: 'absolute', top: '0px', left: '0px', right:'0px',bottom:'0px',
                     backgroundColor:'white',zIndex:'30',overflow:'auto'}}>
          {itemList}
          </div>
          </div>
      </div>
     );}
}


export default MenuPickerOverlay;