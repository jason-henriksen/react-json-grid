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

  @action onClick(evt){

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

  @action onKeyDown(e){
    if (this.props.x !== this.props.GridStore.cursor.editX ||
      this.props.y !== this.props.GridStore.cursor.editY) {
      if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40' ) {
        console.log('move');
        this.props.GridStore.cellMoveKey(e);
      }
      else{
        // cell edit
        console.log('edit');
        this.props.GridStore.cursor.editX = this.props.x;
        this.props.GridStore.cursor.editY = this.props.y;
        this.props.GridStore.curEditingValue = this.props.cellData;
      }
    }
  }  

  @action valChange(evt){
    console.log(evt);
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

    var style={...this.props.style};
    if (this.props.GridStore.selectionBounds.l <= this.props.x &&
        this.props.GridStore.selectionBounds.r >= this.props.x &&
        this.props.GridStore.selectionBounds.t <= this.props.y &&
        this.props.GridStore.selectionBounds.b >= this.props.y 
    ) {
      // CSSNOTE!
      style.backgroundColor = 'lightblue';
      style.zIndex = 5;
    }
    else{
      style.backgroundColor = 'white';
    }

    // render data standard
    var renderPlan = this.props.cellData;

    if(this.props.x === this.props.GridStore.cursor.x &&
       this.props.y === this.props.GridStore.cursor.y )
    {
      if (this.props.x === this.props.GridStore.cursor.editX &&
         this.props.y === this.props.GridStore.cursor.editY){
        console.log('input');
        renderPlan = 
          <input value={this.props.GridStore.curEditingValue} onChange={this.valChange} 
                  style={{backgroundColor:'yellow',width:'100%',height:'100%',border:'0px',padding:'0px',margin:'0px'}}
                  ref={input => input && input.focus()}
                  onBlur={this.endEdit}
            />
      }
      else{
        renderPlan = <div tabIndex='0'
          onClick={this.onClick}
          style={{ width: '100%', height: '100%' }}
          ref={div => div && div.focus()}
          onKeyDown={this.onKeyDown}>{this.props.cellData}</div>;
      }
    } 
    else{
      renderPlan = <div tabIndex='0'
                        onClick={this.onClick} 
                        style={{ width: '100%', height: '100%'}}
                        onKeyDown={this.onKeyDown}>{this.props.cellData}</div>;
    }


    return(
      <div id={this.props.id}
          style={style}
      >
          {renderPlan}
      </div>);
    
  }
}


export default GridCell;