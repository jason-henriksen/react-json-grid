import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';


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
    }
  }

  @action onKeyDown(e)
  {
    this.props.GridStore.autoFocus=true;
    if (this.props.x !== this.props.GridStore.cursor.editX ||
        this.props.y !== this.props.GridStore.cursor.editY) {
      if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' ) {
        this.props.GridStore.cellMoveKey(e);
      }
      else{
        // cell edit
        this.props.GridStore.cursor.editX = this.props.x;
        this.props.GridStore.cursor.editY = this.props.y;
        this.props.GridStore.curEditingValue = this.props.cellData;
      }
    }
  }  

  @action valChange(evt){
    this.props.GridStore.curEditingValue = evt.target.value;
  }

  @action endEdit(){
    this.props.GridStore.cursor.editX = -1;
    this.props.GridStore.cursor.editY = -1;
    this.props.GridStore.curEditingValue = '';

    this.props.GridStore.cursor.x++;
    if (this.props.GridStore.cursor.x>this.props.maxX){
      this.props.GridStore.cursor.x=0;
      this.props.GridStore.cursor.y++;
    }
    if (this.props.GridStore.cursor.y > this.props.maxY) {
      this.props.GridStore.cursor.y=0;
    }
    
  }

  render() {

    var style={...this.props.cellStyle};
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
      style.marginLeft=-1*this.props.borderWidth;
      //style.marginTop=-1*this.props.padWidth;
    }

    console.log(JSON.stringify(style));
    

    // render data standard
    var renderPlan = <div>this.props.cellData</div>;
    var isFocusNeeded = this.props.GridStore.autoFocus && this.props.x === this.props.GridStore.cursor.x && this.props.y === this.props.GridStore.cursor.y;

    if(this.props.x === this.props.GridStore.cursor.x &&
       this.props.y === this.props.GridStore.cursor.y &&
       this.props.x === this.props.GridStore.cursor.editX &&
       this.props.y === this.props.GridStore.cursor.editY){

        var styleIn={...this.props.inputStyle};
        
        if(this.props.x>0){
          styleIn.marginLeft=-1*this.props.borderWidth;
          //style.marginTop=-1*this.props.padWidth;
        }
        
        
        renderPlan = 
          <input value={this.props.GridStore.curEditingValue} onChange={this.valChange}                   
                  id={this.props.id} style={styleIn}
                  ref={input => input && input.focus()}
                  onBlur={this.endEdit}
            />
    } 
    else{
      renderPlan = <div tabIndex='0'
                        onClick={this.onClick} 
                        id={this.props.id} style={style}                        
                        ref={div => div && isFocusNeeded && div.focus()}
                        onKeyDown={this.onKeyDown}>{this.props.cellData}</div>;
    }
    
    return(renderPlan);
    
  }
}


export default GridCell;