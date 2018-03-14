import React from 'react';
import autoBind from 'react-autobind';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class MenuPickerOverlay extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  blackHole(evt){}

  endEdit()
  {  
    this.props.GridStore.cursor.editX = -1;
    this.props.GridStore.cursor.editY = -1;
    this.props.GridStore.showDatePicker = false;
    this.props.GridStore.showDateTimePicker = false;
  }

  updateValue(evt){
    this.props.GridStore.onChangePivotWrapper(this.props.GridStore.cursor.editX, this.props.GridStore.cursor.editY, this.props.GridStore.cursor.objKey, this.props.GridStore.curEditingValue);    
    this.endEdit();
  }

  render() {
    var editVal = this.props.GridStore.curEditingValue||'';

    var itemList=[];
    var listTarget = this.props.GridStore.colDefList[this.props.GridStore.cursor.editObjKey].easyMenu;
    if (Array.isArray(listTarget)){  // it's an array
      // JJH Needs a storybook test
    }
    else{  // or it's a pipe delimited string
      listTarget = ''+listTarget;
      itemList = listTarget.split('|').map(item => { return (<div style={{ padding: '2px' }} onClick={saneThis.updateValue}>{item}</div>)} );
    }


    return (
      <div>
        <div style={{position:'absolute',top:'0px',bottom:'0px',left:'0px',width:this.props.uiMath.rowWide+'px',backgroundColor:'grey',zIndex:'20',opacity:'0.7'}} onClick={this.endEdit} />
        <div style={{position: 'absolute', top: '15px', left: '15px', 
                     width: (uiMath.rowWide - 50) + 'px', height: (uiMath.gridHigh-30),
                     backgroundColor:'white',zIndex:'30',overflow:'auto'}}>
          {itemList}
          </div>
      </div>
     );}
}


export default MenuPickerOverlay;