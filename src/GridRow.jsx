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

    console.log(this.props.GridStore);

    var selRow=false;
    if(this.props.GridStore.cursor.y===this.props.index){
      selRow=true;
    }

    if (this.props.index<this.props.data.length){
      var cellArray = [];
      var marginOffset = 0;
      var cellBackColor='white'; // CSSNOTE!
      for (var ctr = 0; ctr < this.props.keyNames.length; ctr++) {
        var borderColor='black';
        var zIndex=0;
        var outline='';
        cellBackColor = 'white';// CSSNOTE!
        if(ctr===this.props.GridStore.cursor.x && selRow){
          cellBackColor = 'lightblue';// CSSNOTE!
          zIndex = 5;
        }
        cellArray.push(
        <GridCell 
          key={this.props.index+'-'+ctr} 
          id={this.props.index+'-'+ctr}
          x={ctr}
          y={this.props.index}
          maxX={this.props.keyNames.length}
          maxY={this.props.data.length}
          style={{  width: this.props.autoColWidth, 
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: this.props.borderWidth, 
            borderTop: '0px',
            height: this.props.rowHeight,
            display: 'inline-block', 
            outline: outline,
            backgroundColor: cellBackColor,
            marginLeft: marginOffset }}
            GridStore={this.props.GridStore}
            cellData={this.props.data[this.props.index][this.props.keyNames[ctr]]}
          />            
          
        );
        marginOffset = Math.floor(-1 * this.props.borderWidth);
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