import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';
import GridRow from './GridRow';

// Wrapper for the grid
// This grid allows deep styling via style objects, 
// but retains control of border and padding to ensure that the grid lines up.
@observer class GridBody extends React.Component {
  constructor(props) { 
    super(props); 
    autoBind(this); 
    this.componentWillReceiveProps(props);    // first call needs to set up the data store
  }

  @observable scrollBarWide = 0;              // keep track of how wide the scroll bar will be
  @action setScrollBarWide(exp) { this.scrollBarWide = exp.scrollbarWidth+2; } // account for rounding error


  componentWillReceiveProps(nextProps)
  {
    if (this.props.GridStore) {
      this.props.GridStore.prepSelectionField(nextProps);
    }
    else{
      console.log('missing grid store');
    }
  }

  // javascript sucks at math
  makeValidInt(inputVal,defaultVal){
    var res = (inputVal||defaultVal);
    if(inputVal===0){res=inputVal;}
    if(res<0){ res = defaultVal; }
    return Number(res);
  }

  @action blurControl(evt){
    // brain dead LUCK is the only thing making this work.
    // when moving focus in the cell, it sets autoFocus true.
    // then it renders all the cells and one of them takes focus, focusing the new cell and bluring the old one.
    // the blur event comes here and tells us to not steal focus any more.
    // Now we can type into other things all day.  But only if we click into a cell will the focus move with us.  Lucky!
    this.props.GridStore.autoFocus=false;
  }

  render() {

    var borderWideLocal = this.makeValidInt(this.props.borderWide,1);
    var padWideLocal = this.makeValidInt(this.props.padWide, 3);

    var rowWide = this.props.width - this.scrollBarWide;
    var autoColWide = 0; // width of the default filled column, before weights
    var fixedRowCount = this.props.rowCount;
    var keyNames=[];

    // user requested height does NOT include padding.  
    var rowHighNoPadLocal = this.makeValidInt(this.props.rowHigh, 18);
    if (-1 === rowHighNoPadLocal) { rowHighNoPadLocal=23;}
    var rowHighWithPadLocal = this.makeValidInt(rowHighNoPadLocal, 18);
    rowHighWithPadLocal += padWideLocal;
    rowHighWithPadLocal += padWideLocal;

    var colHeaderHigh = this.props.colHeaderHigh;
    if (-1 === colHeaderHigh) { colHeaderHigh = 18; }
    if (this.props.colHeaderHide) { colHeaderHigh = 0; } // hiDe not wide or high
    
    var gridHighLocal = this.props.gridHigh || 300;
    if (gridHighLocal === -1) {
      gridHighLocal = 300;
    }

    var showBottomGridLine=true;
    var rowHeaderList=[];
    var saveColumnForRowHeader=0;

    if(this.props.data && this.props.data.length>0){
      // we have rows of objects to display ( check for an array )

      if(this.props.pivotOn){  // pivot the data using this key as the col header
        //---- PIVOTED FLOW
        keyNames.push('\\');
        for(var pctr=0;pctr<this.props.data.length;pctr++){
          keyNames.push(this.props.data[pctr][this.props.pivotOn]);
        }
        rowHeaderList = Object.keys(this.props.data[0]);
        fixedRowCount = rowHeaderList.length;
        saveColumnForRowHeader=1;
      }
      else{
        //---- NORMAL FLOW
        keyNames = Object.keys(this.props.data[0]);
        if (this.props.rowCount != this.props.data.length) {
          fixedRowCount = this.props.data.length;
        }
        
      }

      autoColWide = Math.floor(
        ( this.props.width -  // total width
          borderWideLocal -  // minus left most border bar
          this.scrollBarWide  // minus scroll bar
        ) / (keyNames.length)); // div number of items + (optionally plus 1 if a row header is present)
      autoColWide -= (borderWideLocal);   // each column minus right border amount
      autoColWide -= (padWideLocal);      // each column minus left pad amount
      autoColWide -= (padWideLocal);      // each column minus right pad amount

      // check wether to show the bottom line
      var actualDisplayHigh = (this.props.data.length*rowHighWithPadLocal)+colHeaderHigh;
      if(actualDisplayHigh < gridHighLocal){
        showBottomGridLine=false;
      }

    }
    else if(this.props.getRowData){
      autoColWide=
        this.props.width -
        this.scrollBarWide -
        (borderWideLocal*2);
      keyNames = ["No Data Provided"];
    }
    else{
      autoColWide =
        this.props.width -
        this.scrollBarWide -
        (borderWideLocal * 2);
      keyNames = ["No Data Provided"];
    }
    

    var header=[];
    var marginOffset=0;
    if (!this.props.colHeaderHide) {    
      for(var ctr=0;ctr<keyNames.length;ctr++){

        var titleText = keyNames[ctr]; // what key am I on?
        if(this.props.GridStore.colDefList[titleText]){ // is there a colDef that uses this key?
          titleText = this.props.GridStore.colDefList[titleText].title || titleText; // if there is a title for the colDef use it, or just stick with thekey
        }

        header.push(  <div key={ctr} 
                          style={{
                            backgroundColor: '#F3F3F3',
                            textAlign:'center',
                            ...this.props.styleHeader,
                            width:autoColWide,
                            borderStyle: 'solid',
                            borderWidth:borderWideLocal,
                            padding: padWideLocal+'px',
                            display:'inline-block', 
                            marginLeft:marginOffset,
                            height:colHeaderHigh+'px'}}>
                        {titleText}
                      </div> );
        marginOffset=-1*borderWideLocal;
      }
    }
    else{
      header.push(<div style={{
        ...this.props.styleHeader,
        width: (borderWideLocal + (keyNames.length*(autoColWide+borderWideLocal+padWideLocal+padWideLocal)) + 'px'),
        borderTopStyle: 'solid',
        borderTopWidth: borderWideLocal,
        height: '0px'
      }} />);
    }

    console.log(fixedRowCount, gridHighLocal , (colHeaderHigh||0) , (borderWideLocal * 3));
    return (
        <div style={{height:gridHighLocal}} onKeyPress={this.onKeyPress} onBlur={this.blurControl}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>
          <VirtualList
            width='100%'            
            height={gridHighLocal - (colHeaderHigh||0) -(borderWideLocal*3) }
            itemCount={fixedRowCount}
            itemSize={rowHighWithPadLocal+borderWideLocal}            

            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow  cellHigh={rowHighNoPadLocal}
                          colHeaderHigh={colHeaderHigh}
                          data={this.props.data}
                          GridStore={this.props.GridStore}
                          index={index} 
                          borderWide={borderWideLocal} 
                          padWide={padWideLocal} 
                          rowWide={rowWide} 
                          autoColWide={autoColWide} 
                          keyNames={keyNames} 
                          styleInput={this.props.styleInput}
                          styleCell={this.props.styleCell}
                          rowHeaderList={rowHeaderList}
                          pivotOn={this.props.pivotOn}
                />
              </div>
            }
          />                    
      {showBottomGridLine &&
        <div style={{ ...this.props.styleHeader,
                      width: (borderWideLocal + (keyNames.length*(autoColWide+borderWideLocal+padWideLocal+padWideLocal)) + 'px'),
                      borderTopStyle: 'solid',                      
                      borderTopWidth: borderWideLocal,
                      height:'0px'}}/>
}
      </div>
    );
  }
}


export default GridBody;