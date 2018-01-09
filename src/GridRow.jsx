import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';


class GridRow extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render() {

    if (this.props.index<this.props.data.length){
      var cellArray = [];
      var marginOffset = 0;
      for (var ctr = 0; ctr < this.props.keyNames.length; ctr++) {
        cellArray.push(<div key={this.props.index+'-'+ctr}
          style={{  width: this.props.autoColWidth, 
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: this.props.borderWidth, 
            borderTop: '0px',
            height: this.props.rowHeight,
            display: 'inline-block', 
            marginLeft: marginOffset }}>
          {this.props.data[this.props.index][this.props.keyNames[ctr]]}
        </div>);
        marginOffset = -1 * this.props.borderWidth;
      }
      
      return(
        <div style={{ width:this.props.rowWide,
                      height:this.props.rowHeight}}>
          {cellArray}
        </div>
      );
    }
    else{
      return (
        <div style={{
          width: this.props.rowWide,
          height: this.props.rowHeight
        }}>
        </div>
      );
    }
    
  }
}


export default GridRow;