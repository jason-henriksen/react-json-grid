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
    this.props.GridStore.cursor.x = this.props.x;
    this.props.GridStore.cursor.y = this.props.y;
  }
  @action onKeyDown(e){
    this.props.GridStore.cellMoveKey(e);
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



    return(
      <div id={this.props.id}
          style={style}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          tabIndex='0'
          >
          {this.props.cellData}
        </div>);
    
  }
}


export default GridCell;