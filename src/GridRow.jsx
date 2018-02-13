import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';
import GridCell from './GridCell';


@observer class GridRow extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render() {

    var selRow=false;
    if(this.props.GridStore.cursor.y===this.props.index){
      selRow=true;
    }

    var cellArray = [];
    var marginOffset = 0;
    for (var ctr = 0; ctr < this.props.keyNames.length; ctr++) {
      var borderColor='black';
      var zIndex=0;
      var outline='';
      cellArray.push(
      <GridCell 
        key={this.props.index+'-'+ctr} 
        id={this.props.index+'-'+ctr}
        x={ctr}
        y={this.props.index}
        style={{  width: this.props.autoColWidth, 
          borderStyle: 'solid',
          borderColor: 'black',
          borderWidth: this.props.borderWidth, 
          padding: (this.props.padding||0)+'px', 
          borderTop: '0px',
          height: this.props.cellHeight,
          display: 'inline-block', 
          outline: outline,
          marginLeft: marginOffset }}
          GridStore={this.props.GridStore}
          cellData={this.props.data[this.props.index][this.props.keyNames[ctr]]}
        />            
        
      );
      marginOffset = Math.floor(-1 * this.props.borderWidth);
    }
    
    return(
      <div style={{ width: this.props.rowWide,
                    height:this.props.rowHeight}}>
        {cellArray}
      </div>
    );
    
  }
}


export default GridRow;