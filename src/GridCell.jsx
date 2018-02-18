import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';

import EasyBool from './easyTools/EasyBool';


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
        this.props.GridStore.cursor.y++;
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
      }
      else if (e.keyCode == '9') { // tab
        this.props.GridStore.cursor.x++;
        if (this.props.GridStore.cursor.x > this.props.GridStore.cursor.maxX) {
          this.props.GridStore.cursor.x = 0;
          this.props.GridStore.cursor.y++;
          console.log(JSON.stringify(this.props.GridStore.cursor));
        }
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
      }
      else{
        // cell edit
        this.props.GridStore.cursor.editX = this.props.x;
        this.props.GridStore.cursor.editY = this.props.y;
        this.props.GridStore.curEditingValue = '';
      }
    }
    e.stopPropagation();
    e.preventDefault();        
  }  

  @action onKeyDownWhenEditing(e) {
    this.props.GridStore.autoFocus = true;

      if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
        this.props.GridStore.cellMoveKey(e);
      }
      else if (e.keyCode == '13') {
        // commit this one
        // start editing the next one
        this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);
        this.props.GridStore.cursor.y++;
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
        this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
        this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
        this.props.GridStore.curEditingValue = '';
      }
      else if (e.keyCode == '9') { // tab
        // commit this one
        // start editing the next one
        this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);
        this.props.GridStore.cursor.x++;
        if (this.props.GridStore.cursor.x > this.props.GridStore.cursor.maxX) {
          this.props.GridStore.cursor.x = 0;
          this.props.GridStore.cursor.y++;
        }
        if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
          this.props.GridStore.cursor.y = 0;
        }
        this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
        this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
        this.props.GridStore.curEditingValue = '';
      }
      else if (e.keyCode == '27') {
        // cell edit abort
        this.props.GridStore.cursor.editX = -1;
        this.props.GridStore.cursor.editY = -1;
        this.props.GridStore.curEditingValue = '';
      }
      else {
        // cell edit
        this.props.GridStore.cursor.editX = this.props.x;
        this.props.GridStore.cursor.editY = this.props.y;
        this.props.GridStore.curEditingValue = '';
      }
  }  
  

  @action valChange(evt){
    this.props.GridStore.curEditingValue = evt.target.value;
  }

  @action endEdit()
  {
    this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);
    
    this.props.GridStore.cursor.editX = -1;
    this.props.GridStore.cursor.editY = -1;
    this.props.GridStore.curEditingValue = '';
  }

  @action onEnter(e) {
    if (e.keyCode == '13') {    
      this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);

      this.props.GridStore.cursor.y++;
      if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
        this.props.GridStore.cursor.y = 0;
      }

      this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
      this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
      this.props.GridStore.curEditingValue = '';
    }
    else if (e.keyCode == '9') { // tab
      // commit this one
      // start editing the next one
      this.props.GridStore.onChangePivotWrapper(this.props.x, this.props.y, this.props.objKey, this.props.GridStore.curEditingValue);
      this.props.GridStore.cursor.x++;
      if (this.props.GridStore.cursor.x > this.props.GridStore.cursor.maxX) {
        this.props.GridStore.cursor.x = 0;
        this.props.GridStore.cursor.y++;
      }
      if (this.props.GridStore.cursor.y > this.props.GridStore.cursor.maxY) {
        this.props.GridStore.cursor.y = 0;
      }
      this.props.GridStore.cursor.editX = this.props.GridStore.cursor.x;
      this.props.GridStore.cursor.editY = this.props.GridStore.cursor.y;
      this.props.GridStore.curEditingValue = '';
      this.props.GridStore.autoFocus=true;
      e.stopPropagation();
      e.preventDefault();        
    }
    else if (e.keyCode == '27') {
      // cell edit abort
      this.props.GridStore.cursor.editX = -1;
      this.props.GridStore.cursor.editY = -1;
      this.props.GridStore.curEditingValue = '';
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
    
    if(this.props.x>0){
      style.marginLeft=-1*this.props.borderWide;
    }
    // render data standard
    var renderPlan = '';
    var isFocusNeeded = this.props.GridStore.autoFocus && this.props.x === this.props.GridStore.cursor.x && this.props.y === this.props.GridStore.cursor.y;

    /*
    var assumeEditOk=true;
    if (this.props.GridStore.colDefList && 
      this.props.GridStore.colDefList[this.props.objKey] && 
      this.props.GridStore.colDefList[this.props.objKey].editDisabled){
      assumeEditOk = false;
    }
    console.log("aek " + assumeEditOk);
    */

    if (//assumeEditOk && 
       this.props.x === this.props.GridStore.cursor.x &&
       this.props.y === this.props.GridStore.cursor.y &&
       this.props.x === this.props.GridStore.cursor.editX &&
       this.props.y === this.props.GridStore.cursor.editY){

        var styleIn={...this.props.styleInput};
        
        if(this.props.x>0){
          styleIn.marginLeft=-1*this.props.borderWide;
        }
        styleIn.verticalAlign='top';
        
        
        renderPlan = 
          <input  value={this.props.GridStore.curEditingValue} 
                  onChange={this.valChange}                   
                  onKeyDown={this.onEnter}
                  id={this.props.id} style={styleIn}
                  ref={input => input && input.focus()}
                  onBlur={this.endEdit}
            />
    } 
    else{


      var renderVal = '' + this.props.cellData;
      if (this.props.GridStore.colDefList && 
          this.props.GridStore.colDefList[this.props.objKey] &&
          this.props.GridStore.colDefList[this.props.objKey].compCell
      ){
        // we have a custom view component.  Render it.
        // it may want to change values directly, so give it everything it needs
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

      renderPlan = <div tabIndex='0'
                        onClick={this.onClick} 
                        id={this.props.id} style={style}                        
                        ref={div => div && isFocusNeeded && div.focus()}
                        onKeyDown={this.onKeyDownWhenViewing}>
            {renderVal}
      </div>;
    }
    
    return(renderPlan);
    
  }
}


export default GridCell;