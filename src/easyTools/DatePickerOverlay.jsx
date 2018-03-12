import React from 'react';
import autoBind from 'react-autobind';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DatePickerOverlay extends React.Component {
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
    if(this.props.GridStore.showDateTimePicker){
      this.props.GridStore.curEditingValue = evt.format(this.props.uiMath.formatDate+' '+this.props.uiMath.formatTime);    
    }
    else{
      this.props.GridStore.curEditingValue = evt.format(this.props.uiMath.formatDate);    
    }
    this.props.GridStore.onChangePivotWrapper(this.props.GridStore.cursor.editX, this.props.GridStore.cursor.editY, this.props.GridStore.cursor.objKey, this.props.GridStore.curEditingValue);    
    this.endEdit();
  }

  render() {
    var editVal = this.props.GridStore.curEditingValue||'';
    if(''===editVal || 'Invalid date'===editVal || !moment(editVal).isValid() ){editVal=moment();}

    var timeFormat=null;
    if(this.props.GridStore.showDateTimePicker){
      timeFormat=this.props.uiMath.formatTime;
    }

    return (
      <div>
        <div style={{position:'absolute',top:'0px',bottom:'0px',left:'0px',width:this.props.uiMath.rowWide+'px',backgroundColor:'grey',zIndex:'20',opacity:'0.7'}} />
        <div style={{position:'absolute',top:'15px',left:'15px',backgroundColor:'white',zIndex:'30'}}>
            <DatePicker
              id='react-datepicker-manual'
              inline
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              isClearable
              selected={moment(editVal)}
              onChange={this.updateValue}
              todayButton={"Today"}
              showTimeSelect={this.props.GridStore.showDateTimePicker}
            />      
          </div>
      </div>
     );}
}


export default DatePickerOverlay;