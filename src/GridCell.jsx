import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';

import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import EasyBool from './easyTools/EasyBool';

window.reactJsonGridFocusInput = function(elem){
    elem.focus();
    elem.setSelectionRange(elem.value.length,elem.value.length);
}


@observer class GridCell extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @action onClick(evt)
  {
    this.props.GridStore.autoFocus=true;
    if (this.props.x === this.props.GridStore.cursor.x &&
        this.props.y === this.props.GridStore.cursor.y) {
      this.props.GridStore.cursor.editX = this.props.x;
      this.props.GridStore.cursor.editY = this.props.y;
      this.props.GridStore.curEditingValue = this.props.cellData;
    }
    else{
      this.props.GridStore.cursor.x = this.props.x;
      this.props.GridStore.cursor.y = this.props.y;
      if (this.props.GridStore.cursor.x < 0) { this.props.GridStore.cursor.x=0; } // can't edit row headers
    }
  }

  @action onKeyDownWhenViewing(e)
  {
    this.props.GridStore.autoFocus=true;
    if (this.props.x !== this.props.GridStore.cursor.editX ||
        this.props.y !== this.props.GridStore.cursor.editY) {
      if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' ) {
        this.props.GridStore.cellMoveKey(e);
      }
      else if (e.keyCode == '13') {
        if(e.shiftKey) {
          // back-enter
          this.props.GridStore.cursor.y--;
          if (this.props.GridStore.cursor.y < 0 ) {
            this.props.GridStore.cursor.y = 0;
          }
        }
        else{
          // forward-enter
          this.props.GridStore.cursor.y++;
          if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
            this.props.GridStore.cursor.y = 0;
          }
        }        
      }
      else if (e.keyCode == '9') { // tab
        if(e.shiftKey) {
          // back tab
          this.props.GridStore.cursor.x--;
          if (this.props.GridStore.cursor.x < 0) {
            this.props.GridStore.cursor.x = this.props.GridStore.cursor.maxX;
            this.props.GridStore.cursor.y--;
          }
          if (this.props.GridStore.cursor.y < 0) {
            this.props.GridStore.cursor.y = 0;
          }
        }
        else{
          // forward tab
          this.props.GridStore.cursor.x++;
          if (this.props.GridStore.cursor.x > this.props.GridStore.cursor.maxX) {
            this.props.GridStore.cursor.x = 0;
            this.props.GridStore.cursor.y++;
          }
          if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
            this.props.GridStore.cursor.y = 0;
          }
        }
      }
      else if (e.keyCode == '32') { // space
        // cell edit
        this.props.GridStore.cursor.editX = this.props.x;
        this.props.GridStore.cursor.editY = this.props.y;
        this.props.GridStore.curEditingValue = this.props.GridStore.getDataRespectingPivot(this.props.data);
      }
      else{
        if( e.key.length===1 ){ // must be a char
          // not that the react code calls a javascript function to make sure the cursor goes to the end of the input so you can keep typing naturally.
          this.props.GridStore.cursor.editX = this.props.x;
          this.props.GridStore.cursor.editY = this.props.y;
          this.props.GridStore.curEditingValue = ''+e.key;
        }
      }
    }
    e.stopPropagation();
    e.preventDefault();        
  }  
  

  @action valChange(evt){
    this.props.GridStore.curEditingValue = evt.target.value;
  }

  @action valChangeDate(value) {
    this.props.GridStore.curEditingValue = value;
  }
  

  @action endEdit()
  {
    if (this.props.GridStore.colDefList &&
      this.props.GridStore.colDefList[this.props.objKey]) {
      if (
        (this.props.GridStore.colDefList[this.props.objKey].easyInt && !this.props.GridStore.curEditIsValidFor.isValidInt) ||
        (this.props.GridStore.colDefList[this.props.objKey].easyFloat && !this.props.GridStore.curEditIsValidFor.isValidFloat) ||
        (this.props.GridStore.colDefList[this.props.objKey].easyMoney && !this.props.GridStore.curEditIsValidFor.isValidFloat)
      ) {
        // value is not valid for the field definition.  Do not make the change.
        this.props.GridStore.cursor.editX = -1;
        this.props.GridStore.cursor.editY = -1;
        return;
      }
    }
    
    this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);
    
    this.props.GridStore.cursor.editX = -1;
    this.props.GridStore.cursor.editY = -1;
  }

  @action onKeyDownWhenEditing(e) {

    if (e.keyCode == '13') {  
      // commit the value
      this.endEdit(); 
      // move the cursor
      if(e.shiftKey) {
        // back-enter
        this.props.GridStore.cursor.y--;
        if (this.props.GridStore.cursor.y < 0 ) {
          this.props.GridStore.cursor.y = 0;
        }
      }
      else{
        // forward-enter
        this.props.GridStore.cursor.y++;
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
      }        

      // start editing new location
      this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
      this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
      this.props.GridStore.curEditingValue = this.props.GridStore.getDataRespectingPivot(this.props.data);
    }
    else if (e.keyCode == '9') { // tab
      // commit the value
      this.endEdit(); 

      // move the cursor
      if(e.shiftKey) {
        // back tab
        this.props.GridStore.cursor.x--;
        if (this.props.GridStore.cursor.x < 0) {
          this.props.GridStore.cursor.x = this.props.GridStore.cursor.maxX;
          this.props.GridStore.cursor.y--;
        }
        if (this.props.GridStore.cursor.y < 0) {
          this.props.GridStore.cursor.y = 0;
        }
      }
      else{
        // forward tab
        this.props.GridStore.cursor.x++;
        if (this.props.GridStore.cursor.x > this.props.GridStore.cursor.maxX) {
          this.props.GridStore.cursor.x = 0;
          this.props.GridStore.cursor.y++;
        }
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
      }

      // start editing the next one
      this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
      this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
      this.props.GridStore.curEditingValue = this.props.GridStore.getDataRespectingPivot(this.props.data);;
      this.props.GridStore.autoFocus=true;
      e.stopPropagation();
      e.preventDefault();        
    }
    else if (e.keyCode == '27') {
      // cell edit abort
      this.props.GridStore.cursor.editX = -1;
      this.props.GridStore.cursor.editY = -1;
    }
    
  }  

  render() {

    var style={...this.props.styleCell};
    if (this.props.GridStore.selectionBounds.l <= this.props.x &&
        this.props.GridStore.selectionBounds.r >= this.props.x &&
        this.props.GridStore.selectionBounds.t <= this.props.y &&
        this.props.GridStore.selectionBounds.b >= this.props.y 
    ) {
      // CSSNOTE!
      style.backgroundColor = 'lightblue';
      style.zIndex = 5;
    }

    // order ride width if needed
    if (this.props.GridStore.colDefList[this.props.objKey]) { // is there a colDef that uses this key?
      var curColWide = style.width;
      if (this.props.GridStore.colDefList[this.props.objKey].widePx) {
        curColWide = this.props.GridStore.colDefList[this.props.objKey].widePx+'px';
      }
      else if (this.props.GridStore.colDefList[this.props.objKey].widePct) {
        curColWide = (this.props.uiMath.rowWide * (this.props.GridStore.colDefList[this.props.objKey].widePct / 100)) + 'px';
      }
      style.width = curColWide;
    }
    
    if(this.props.x>0){
      style.marginLeft=-1*this.props.uiMath.borderWide;
    }
    // render data standard
    var renderPlan = '';
    var isFocusNeeded = this.props.GridStore.autoFocus && this.props.x === this.props.GridStore.cursor.x && this.props.y === this.props.GridStore.cursor.y;

    
    var assumeEditOk=true;
    if (this.props.GridStore.colDefList && 
      this.props.GridStore.colDefList[this.props.objKey] && 
      (this.props.GridStore.colDefList[this.props.objKey].editDisabled ||  // turn off the auto editor
       this.props.GridStore.colDefList[this.props.objKey].easyBool)        // boolean doesn't need the editor
      ){
      assumeEditOk = false;
    }

    if (assumeEditOk && 
          this.props.x === this.props.GridStore.cursor.x &&
          this.props.y === this.props.GridStore.cursor.y &&
          this.props.x === this.props.GridStore.cursor.editX &&
          this.props.y === this.props.GridStore.cursor.editY)
    {
      var styleIn={...this.props.styleInput};
      
      if(this.props.x>0){
        styleIn.marginLeft=-1*this.props.uiMath.borderWide;
      }
      styleIn.verticalAlign='top';
      styleIn.width = style.width;  // use the column defined width override if needed.


      // check for easy column tools
      if(this.props.GridStore.colDefList &&
          this.props.GridStore.colDefList[this.props.objKey]){

        // check validation
        if (
            (this.props.GridStore.colDefList[this.props.objKey].easyInt && !this.props.GridStore.curEditIsValidFor.isValidInt) ||
            (this.props.GridStore.colDefList[this.props.objKey].easyFloat && !this.props.GridStore.curEditIsValidFor.isValidFloat) ||
            (this.props.GridStore.colDefList[this.props.objKey].easyMoney && !this.props.GridStore.curEditIsValidFor.isValidFloat)
          ){
          styleIn.outline="5px red dashed";
        }

        // check right alignment
        if (
          (this.props.GridStore.colDefList[this.props.objKey].easyInt) ||
          (this.props.GridStore.colDefList[this.props.objKey].easyFloat) ||
          (this.props.GridStore.colDefList[this.props.objKey].easyMoney)
        ) {
          styleIn.textAlign = "right";
        }          
      }

      var curDisplayVal = this.props.GridStore.curEditingValue;
      if(null === curDisplayVal){ curDisplayVal = this.props.cellData;}

      // check for easy Date
      if (this.props.GridStore.colDefList &&
          this.props.GridStore.colDefList[this.props.objKey] &&
          this.props.GridStore.colDefList[this.props.objKey].easyDate){
        renderPlan=
        <div tabIndex='0' id={this.props.id} style={style}>
          <DatePicker
            selected={moment(curDisplayVal)}
            onChange={this.valChangeDate}
            id={this.props.id}
            onBlur={this.endEdit}            
          />      
        </div >        

      }
      else if (this.props.GridStore.colDefList &&
        this.props.GridStore.colDefList[this.props.objKey] &&
        this.props.GridStore.colDefList[this.props.objKey].easyDateTime) {
        renderPlan =
          <DatePicker
            customInput={<span style={styleIn}>{'' + curDisplayVal}</span>}
            selected={moment(curDisplayVal)}
            onChange={this.valChangeDate}
            showTimeSelect
            dateFormat="LLL"  
            id={this.props.id}
            onBlur={this.endEdit}
          />
      }      
      else{
        // use the normal text input editor
        renderPlan = 
          <input value={curDisplayVal} 
                  onChange={this.valChange}
                  onKeyDown={this.onKeyDownWhenEditing}
                  id={this.props.id} style={styleIn}
                  ref={input => input && window.reactJsonGridFocusInput(input)}
                  onBlur={this.endEdit}
            />
      }
    } 
    else{
      //===== VIEW SIDE

      var renderVal = '' + (this.props.cellData||'');
      if (this.props.GridStore.colDefList && 
          this.props.GridStore.colDefList[this.props.objKey]
      ){
        // we have a custom view component.  Render it.
        // it may want to change values directly, so give it everything it needs

        // check right alignment
        if (
          (this.props.GridStore.colDefList[this.props.objKey].easyInt) ||
          (this.props.GridStore.colDefList[this.props.objKey].easyFloat) ||
          (this.props.GridStore.colDefList[this.props.objKey].easyMoney)
        ) {
          style.textAlign = "right";
          // check validation
          if (
            (this.props.GridStore.colDefList[this.props.objKey].easyInt && !this.props.GridStore.checkValidInt(this.props.cellData) ) ||
            (this.props.GridStore.colDefList[this.props.objKey].easyFloat && !this.props.GridStore.checkValidFloat(this.props.cellData) ) ||
            (this.props.GridStore.colDefList[this.props.objKey].easyMoney && !this.props.GridStore.checkValidFloat(this.props.cellData) )
          ) {
            style.outline = "3px orange dashed";
          }          
        }
        
        // check for custom renders
        if (this.props.GridStore.colDefList[this.props.objKey].compCell){
          renderVal = <span>{
            React.cloneElement(
                this.props.GridStore.colDefList[this.props.objKey].compCell,
                {
                  x: this.props.GridStore.pivotOn ? this.props.y : this.props.x,
                  y: this.props.GridStore.pivotOn ? this.props.x : this.props.x,
                  objKey: this.props.objKey,
                  cellData: this.props.cellData,
                  id: this.props.id+'-comp',
                  onChange: this.props.onChange ,
                }
              )
            }</span>;
        }

        // handle easyBool
        if (this.props.GridStore.colDefList[this.props.objKey].easyBool) {
          renderVal = <span><EasyBool 
                  x={this.props.GridStore.pivotOn ? this.props.y : this.props.x} 
                  y={this.props.GridStore.pivotOn ? this.props.x : this.props.y} 
                  objKey={this.props.objKey}
                  cellData={this.props.cellData}
                  id={this.props.id+'-comp'}
                  onChange={this.props.GridStore.onChange}/></span>
        }
      }  

      renderPlan = <div tabIndex='0'
                        onClick={this.onClick} 
                        id={this.props.id} style={style}                        
                        ref={div => div && isFocusNeeded && div.focus() }
                        onKeyDown={this.onKeyDownWhenViewing}>
            {renderVal}
      </div>;
    }
    
    return(renderPlan);
    
  }
}


export default GridCell;