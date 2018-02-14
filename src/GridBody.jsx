import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';
import GridRow from './GridRow';


@observer class GridBody extends React.Component {
  constructor(props) { 
    super(props); 
    autoBind(this); 
    this.componentWillReceiveProps(props);    
  }

  @observable scrollBarWide = 0;
  @action setScrollBarWide(exp) { this.scrollBarWide = exp.scrollbarWidth+2; } // account for rounding error


  componentWillReceiveProps(nextProps)
  {
    if (this.props.GridStore) {
      var keyNames = [];
      var wide=0;
      var high=0;

      if (this.props.data && this.props.data.length > 0) {
        wide = Object.keys(this.props.data[0]).length;
        high = this.props.data.length;
      }
      if (this.props.GridStore.cursor.maxX !== wide-1 || this.props.GridStore.cursor.maxY!==high-1){
        console.log('update grid size');
        this.props.GridStore.prepSelectionField(wide,high);
      }

      this.props.GridStore.onChange = this.props.onChange;
    }
  }

  makeValidInt(inputVal,defaultVal){
    var res = (inputVal||defaultVal);
    if(inputVal===0){res=inputVal;}
    if(res<0){ res = defaultVal; }
    return Number(res);
  }



  @action blurControl(evt){
    // brain dead LUCK is the only thing making this work.
    // when moving focus in the cell, it sets autoFocus true.
    // then it renders all the cells and on of them takes focus, focusing the new cell and bluring the old one.
    // the blur even comes here and tell us to not steal focus any more.
    // Now we can type into other things all day.  But only if we click into a cell will the focus move with us.  Lucky!
    this.props.GridStore.autoFocus=false;
  }

  render() {
    const {title} = this.props;

    var borderWidthLocal = this.makeValidInt(this.props.borderWidth,1);
    var padWidthLocal = this.makeValidInt(this.props.padWidth, 3);

    var rowWide = this.props.width - this.scrollBarWide;
    var autoColWidth = 0; // width of the default filled column, before weights
    var fixedRowCount = this.props.rowCount;
    var keyNames=[];

    // requested height does NOT include padding.  Should It?
    var rowHighNoPadLocal = this.makeValidInt(this.props.rowHeight, 18);
    if (-1 === rowHighNoPadLocal) { rowHighNoPadLocal=23;}
    var rowHighWithPadLocal = this.makeValidInt(rowHighNoPadLocal, 18);
    rowHighWithPadLocal += padWidthLocal;
    rowHighWithPadLocal += padWidthLocal;

    var colHeaderHeight = this.props.colHeaderHeight;
    if (-1 === colHeaderHeight) { colHeaderHeight = 18; }
    //colHeaderHeight += padWidthLocal;
    //colHeaderHeight += padWidthLocal;
    if (this.props.colHeaderHide) { colHeaderHeight = 0; }
    
    var gridHeightLocal = this.props.gridHeight || this.props.height || 300;
    if (gridHeightLocal === -1) {
      gridHeightLocal = this.props.height || 300;
    }

    var showBottomGridLine=true;

    if(this.props.data && this.props.data.length>0){
      // we have rows of objects to display

      keyNames = Object.keys(this.props.data[0]);
      if(this.props.rowCount!=this.props.data.length){
        fixedRowCount = this.props.data.length;
      }

      autoColWidth = Math.floor(
        ( this.props.width -  // total width
          borderWidthLocal -  // minus left most border bar
          this.scrollBarWide  // minus scroll bar
        ) / keyNames.length); // div number of items
      autoColWidth -= (borderWidthLocal);   // each column minus right border amount
      autoColWidth -= (padWidthLocal);      // each column minus left pad amount
      autoColWidth -= (padWidthLocal);      // each column minus right pad amount
      console.log('acw '+autoColWidth);

      // check wether to show the bottom line
      var actualDisplayHigh = (this.props.data.length*rowHighWithPadLocal)+colHeaderHeight;
      if(actualDisplayHigh < gridHeightLocal){
        showBottomGridLine=false;
      }

    }
    else if(this.props.getRowData){
      autoColWidth=
        this.props.width -
        this.scrollBarWide -
        (borderWidthLocal*2);
      keyNames = ["No Data Provided"];
    }
    else{
      autoColWidth =
        this.props.width -
        this.scrollBarWide -
        (borderWidthLocal * 2);
      keyNames = ["No Data Provided"];
    }

    var header=[];
    var marginOffset=0;
    if (!this.props.colHeaderHide) {    
      for(var ctr=0;ctr<keyNames.length;ctr++){
        header.push(  <div key={ctr} 
                          style={{...this.props.headerStyle,
                            width:autoColWidth,
                            borderStyle: 'solid',
                            borderWidth:borderWidthLocal,
                            padding: padWidthLocal+'px',
                            display:'inline-block', 
                            marginLeft:marginOffset,
                            height:colHeaderHeight+'px'}}>
                          {keyNames[ctr]}
                      </div> );
        marginOffset=-1*borderWidthLocal;
      }
    }
    else{
      header.push(<div style={{
        ...this.props.headerStyle,
        width: (borderWidthLocal + (keyNames.length*(autoColWidth+borderWidthLocal+padWidthLocal+padWidthLocal)) + 'px'),
        borderTopStyle: 'solid',
        borderTopWidth: borderWidthLocal,
        height: '0px'
      }} />);
    }



    return (
        <div style={{height:gridHeightLocal}} onKeyPress={this.onKeyPress} onBlur={this.blurControl}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>
          <VirtualList
            width='100%'            
            height={gridHeightLocal - colHeaderHeight -(borderWidthLocal*3) }
            itemCount={fixedRowCount}
            itemSize={rowHighWithPadLocal+borderWidthLocal}            

            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow  cellHeight={rowHighNoPadLocal}
                          colHeaderHeight={colHeaderHeight}
                          data={this.props.data}
                          GridStore={this.props.GridStore}
                          index={index} 
                          borderWidth={borderWidthLocal} 
                          padWidth={padWidthLocal} 
                          rowWide={rowWide} 
                          autoColWidth={autoColWidth} 
                          keyNames={keyNames} 
                          inputStyle={this.props.inputStyle}
                          cellStyle={this.props.cellStyle}
                />
              </div>
            }
          />                    
      {showBottomGridLine &&
        <div style={{ ...this.props.headerStyle,
                      width: (borderWidthLocal + (keyNames.length*(autoColWidth+borderWidthLocal+padWidthLocal+padWidthLocal)) + 'px'),
                      borderTopStyle: 'solid',                      
                      borderTopWidth: borderWidthLocal,
                      height:'0px'}}/>
}
      </div>
    );
  }
}


export default GridBody;