import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import { ContainerDimensions } from 'react-container-dimensions';
import GridCell from './GridCell';
import ReactTooltip from 'react-tooltip';


@observer class GridRow extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render() {

    var selRow=false;
    if(this.props.GridStore.cursor.y===this.props.index){
      selRow=true;
    }

    var cellArray = [];
    var marginOffset = Math.floor(-1 * this.props.uiMath.borderWide);

    var sharedBaseStyleLeftCol = {
      ...this.props.styleHeader,
      width: this.props.uiMath.autoColWide,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: this.props.uiMath.borderWide,
      padding: (this.props.uiMath.padWide || 0) + 'px',
      borderTop: '0px',
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block',
      outline: outline,
      overflow:'hidden',
    };
    var sharedBaseStyleLeftColIn = {
      width: this.props.uiMath.autoColWide,
      borderStyle: 'solid',
      borderColor: 'black',
      backgroundColor: '#fffef4',
      borderWidth: this.props.uiMath.borderWide,
      padding: (this.props.uiMath.padWide || 0) + 'px',
      borderTop: '0px',
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block',
      outline: outline,
      overflow: 'hidden',
    };

    if (this.props.uiMath.rowHeaderList && this.props.uiMath.rowHeaderList.length>0){ // if pivoted or rowHeadered, make the row headers have header style
      sharedBaseStyleLeftCol.backgroundColor= '#F3F3F3';
      sharedBaseStyleLeftCol.textAlign = 'center';
    }

    
    var sharedBaseStyleInput={  width: this.props.uiMath.autoColWide, 
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: this.props.uiMath.borderWide, 
      backgroundColor: '#fffef4',
      padding: (this.props.uiMath.padWide||0)+'px', 
      borderTop: '0px',
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block', 
      outline: outline,
      marginLeft: marginOffset ,
      overflow: 'hidden',
    };
    var sharedBaseStyle2={  width: this.props.uiMath.autoColWide, 
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: this.props.uiMath.borderWide, 
      padding: (this.props.uiMath.padWide||0)+'px', 
      borderTop: '0px',
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block', 
      outline: outline,
      marginLeft: marginOffset ,
      overflow: 'hidden',
    };
  
    var cellStyleFirst = Object.assign(sharedBaseStyleLeftCol, (this.props.styleCell||{}));      
    var cellStyleLocal = Object.assign(sharedBaseStyle2, (this.props.styleCell || {}));

    var inputStyleFirst = Object.assign(sharedBaseStyleLeftColIn, (this.props.styleInput || {}));
    var inputStyleLocal = Object.assign(sharedBaseStyleInput, (this.props.styleInput || {}));
    inputStyleFirst.marginTop='-4';
    inputStyleLocal.marginTop = '-4';
    

    var keyName = null;  // used for pivoted data only

    var columnCount = this.props.GridStore.cursor.maxX+1;
    if (this.props.pivotOn){
      columnCount = this.props.data.length;
    }
    var isFirst=true;
    for (var ctr = -1; ctr < columnCount; ctr++) {
      var borderColor='black';
      var zIndex=0;
      var outline='';

      cellStyleLocal.marginLeft=marginOffset+'px';

      // row header / pivot work
      if(ctr===-1){
        if(this.props.uiMath.rowHeaderList && this.props.uiMath.rowHeaderList.length > this.props.index) {
          var keyName = this.props.uiMath.rowHeaderList[this.props.index]; // what key am I on?
          var titleText = keyName;
          if (this.props.GridStore.colDefList[keyName]) { // is there a colDef that uses this key?
            titleText = this.props.GridStore.colDefList[keyName].title || keyName; // if there is a title for the colDef use it, or just stick with thekey
          }
          
          var helpComp=null;
          if (this.props.GridStore.colDefList[keyName] && this.props.GridStore.colDefList[keyName].altText) { 
            helpComp = this.props.GridStore.colDefList[keyName].altText; 
          }
          cellArray.push(
            <a data-tip data-for={'dataTip' + keyName} key={this.props.index + '-RH'}>                      
            <GridCell              
              id={this.props.index + '-RH'}
              x={ctr}
              y={this.props.index}
              forceNoEdit={true}
              styleInput={inputStyleFirst}
              styleCell={cellStyleFirst}
              GridStore={this.props.GridStore}
              data={this.props.data}
              cellData={titleText}
              uiMath={this.props.uiMath}
              onChange={this.props.onChange}
            />
            </a>
            );
          isFirst=false;
        }
      }
      else{

        var cellData = '';
        if(this.props.pivotOn){
          cellData = this.props.data[ctr][keyName];
        }
        else{
          cellData = this.props.data[this.props.index][this.props.uiMath.keyNames[ctr]];
        }

        cellArray.push(
        <GridCell 
          key={this.props.index+'-'+ctr} 
          id={this.props.index+'-'+ctr}
          x={ctr}
          y={this.props.index}
          objKey={keyName||this.props.uiMath.keyNames[ctr]}
          styleInput={isFirst ? inputStyleFirst : inputStyleLocal}
          styleCell={isFirst ? cellStyleFirst : cellStyleLocal}
          GridStore={this.props.GridStore}
          data={this.props.data}
          cellData={cellData}
          uiMath={this.props.uiMath}
          onChange={this.props.onChange}
        />            
        );
        isFirst = false;

      }        
  }
    
    return(
      <div>
        {helpComp &&  // only render this if helpComp is defined
          <ReactTooltip id={'dataTip' + keyName} effect='solid' place='right' >
            {helpComp}
          </ReactTooltip>
        }          
        {cellArray}
      </div>
    );
    
  }
}


export default GridRow;