import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import GridCell from './GridCell';



@observer class GridRow extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  showRowHeaderAltText(e,x,y)
  {
    this.props.GridStore.cursor.showAltX = x;
    this.props.GridStore.cursor.showAltY = y;
  }
  hideRowHeaderAltText(e,x,y)
  {
    if(this.props.GridStore.cursor.showAltX === x && this.props.GridStore.cursor.showAltY === y){
      this.props.GridStore.cursor.showAltX = -1;  // don't mess with it if values were set by someone else.
      this.props.GridStore.cursor.showAltY = -1;
      }
  }
    
  render() {

    var selRow=false;
    if(this.props.GridStore.cursor.y===this.props.index){
      selRow=true;
    }

    var cellArray = [];
    var marginOffset = Math.floor(-1 * this.props.uiMath.borderWide);


    
    var topBorder = (this.props.colHeaderHide || this.props.uiMath.forceColHeaderHide) ? this.props.uiMath.borderWide:0;

    var sharedBaseStyleLeftCol = {
      width: this.props.uiMath.autoColWide,
      borderStyle: 'solid',
      borderColor: 'black',
      padding: (this.props.uiMath.padWide || 0) + 'px',
      borderLeftWidth: this.props.uiMath.borderWide, 
      borderRightWidth: this.props.uiMath.borderWide, 
      borderBottomWidth: this.props.uiMath.borderWide, 
      borderTopWidth: topBorder, 
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block',
      outline: outline,
      overflow:'hidden',
    };

    var sharedBaseStyleInput={  width: this.props.uiMath.autoColWide, 
      borderStyle: 'solid',
      borderColor: 'black',
      borderLeftWidth: this.props.uiMath.borderWide,
      borderRightWidth: this.props.uiMath.borderWide,
      borderBottomWidth: this.props.uiMath.borderWide,
      borderTopWidth: topBorder, 
      backgroundColor: '#fffef4',
      padding: (this.props.uiMath.padWide||0)+'px', 
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block', 
      outline: outline,
      marginLeft: marginOffset ,
      overflow: 'hidden',
    };
    var sharedBaseStyle2={  width: this.props.uiMath.autoColWide, 
      borderStyle: 'solid',
      borderColor: 'black',
      borderLeftWidth: this.props.uiMath.borderWide,
      borderRightWidth: this.props.uiMath.borderWide,
      borderBottomWidth: this.props.uiMath.borderWide,
      borderTopWidth: topBorder, 
      padding: (this.props.uiMath.padWide||0)+'px', 
      height: this.props.uiMath.rowHighNoPad,
      display: 'inline-block', 
      outline: outline,
      marginLeft: marginOffset ,
      overflow: 'hidden',
    };
  
    var cellStyleFirst = Object.assign(sharedBaseStyleLeftCol, (this.props.styleCell||{}));      
    var cellStyleLocal = Object.assign(sharedBaseStyle2, (this.props.styleCell || {}));

    var inputStyleFirst = Object.assign(sharedBaseStyleLeftCol, (this.props.styleCell||{}));      
    var inputStyleLocal = Object.assign(sharedBaseStyleInput, (this.props.styleInput || {}));


    var keyName = null;  // used for pivoted data only

    var columnCount = this.props.GridStore.cursor.maxX+1;
    if (this.props.pivotOn || this.props.pivotOn === 0){
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
        cellStyleFirst =       {width: this.props.uiMath.autoColWide,
          borderStyle: 'solid',
          borderColor: 'black',
          padding: (this.props.uiMath.padWide || 0) + 'px',
          borderLeftWidth: this.props.uiMath.borderWide, 
          borderRightWidth: this.props.uiMath.borderWide, 
          borderBottomWidth: this.props.uiMath.borderWide, 
          borderTopWidth: topBorder, 
          height: this.props.uiMath.rowHighNoPad,
          display: 'inline-block',
          outline: outline,
          overflow:'hidden'}
        ; // don't add global cell style on row headers
            
        if(this.props.uiMath.rowHeaderList && this.props.uiMath.rowHeaderList.length > this.props.index) {
          var keyName = this.props.uiMath.rowHeaderList[this.props.index]; // what key am I on?
          var titleText = keyName;
          if (this.props.GridStore.colDefListByKey[keyName]) { // is there a colDef that uses this key?
            titleText = this.props.GridStore.colDefListByKey[keyName].title || keyName; // if there is a title for the colDef use it, or just stick with thekey
          }

          if(this.props.uiMath.pivotRowHeaderWide){
            cellStyleFirst.width = Number(this.props.uiMath.pivotRowHeaderWide);
          }
          isFirst=false;
          
          // add in the row header style
          var gridColLocalStyle = {};
          if(this.props.GridStore.colDefListByKey[keyName]){ 
            gridColLocalStyle = (this.props.GridStore.colDefListByKey[keyName].styleHeader || {});
          }

          var rowHeaderStyle={...cellStyleFirst,...gridColLocalStyle};

          cellArray.push(
            <GridCell              
              key={this.props.uiMath.id + '.' + this.props.index + '.H'}
              id={this.props.uiMath.id + '.' + this.props.index + '.H'}
              x={ctr}
              y={this.props.index}
              forceNoEdit={true}
              styleCell={rowHeaderStyle}
              isFirstColumn={true}
              GridStore={this.props.GridStore}
              data={this.props.data}
              cellData={titleText}
              uiMath={this.props.uiMath}
              onChange={this.props.onChange}
            />
          );
        }
      }
      else{

        var curColKey = this.props.uiMath.colHeaderKeyList[ctr]; // the xth column defined in the colHeaderKey list
        if (this.props.pivotOn || this.props.pivotOn === 0) {          
          if (this.props.GridStore.colDefListByIdx){
            // pvt ON, colDef ON
            //console.log(this.props.index, this.props.GridStore.colDefListByIdx[this.props.index]);
            curColKey = this.props.uiMath.rowHeaderList[this.props.index];
          }
          else{
            curColKey = this.props.uiMath.colHeaderKeyList[this.props.index + 1]; // use Y instead of X and ofset for the row header.  this seems like it could be smoother.
            //curColKey = this.props.index; // use Y instead of X and ofset for the row header.  this seems like it could be smoother.
          }
        }
        var cellData = this.props.GridStore.getDataRespectingPivotAtLocation(this.props.data,ctr,this.props.index);

        cellArray.push(
        <GridCell 
          key={this.props.uiMath.id + '.' +this.props.index+'-'+ctr} 
          id={this.props.uiMath.id+'.'+this.props.index+'-'+ctr}
          x={ctr}
          y={this.props.index}
          objKey={curColKey}
          styleInput={inputStyleLocal}
          styleCell={cellStyleLocal}
          isFirstColumn={isFirst}
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
        {cellArray}
      </div>
    );
    
  }
}


export default GridRow;