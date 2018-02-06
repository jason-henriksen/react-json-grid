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
    console.log(' click '+this.props.id);
    this.props.GridStore.cursor.x = this.props.x;
    this.props.GridStore.cursor.y = this.props.y;
  }
  @action onKeyDown(e){
    if (e.keyCode == '38') {
      // up arrow
      this.props.GridStore.cursor.y--;
      if(this.props.GridStore.cursor.y<0) this.props.GridStore.cursor.y=0;
    }
    else if (e.keyCode == '40') {
        // down arrow
        this.props.GridStore.cursor.y++;
        if(this.props.GridStore.cursor.y>=this.props.maxY) this.props.GridStore.cursor.y = maxY-1;
      }
    else if (e.keyCode == '37') {
      // left arrow
      this.props.GridStore.cursor.x--;
      if(this.props.GridStore.cursor.x<0) this.props.GridStore.cursor.x=0;
    }
    else if (e.keyCode == '39') {
      // right arrow
        this.props.GridStore.cursor.x++;
        if(this.props.GridStore.cursor.x>=this.props.maxX) this.props.GridStore.cursor.x = maxX-1;
    }
  }  

  render() {
    return(
      <div id={this.props.id}
          style={this.props.style}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          tabIndex='0'
          >
          {this.props.CellData}
        </div>);
    
  }
}


export default GridCell;