import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';
import GridRow from './GridRow';
import GridMath from './GridMath';

import EasyBool from './easyTools/EasyBool';

// Wrapper for the grid
// This grid allows deep styling via style objects, 
// but retains control of border and padding to ensure that the grid lines up.
@observer class GridBody extends React.Component {
  constructor(props) { 
    super(props); 
    autoBind(this); 
    this.componentWillReceiveProps(props);    // first call needs to set up the data store
    this.uiMath = new GridMath();
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


  @action blurControl(evt){
    // brain dead LUCK is the only thing making this work.
    // when moving focus in the cell, it sets autoFocus true.
    // then it renders all the cells and one of them takes focus, focusing the new cell and bluring the old one.
    // the blur event comes here and tells us to not steal focus any more.
    // Now we can type into other things all day.  But only if we click into a cell will the focus move with us.  Lucky!
    this.props.GridStore.autoFocus=false;
  }

  @action addRow(){
    // JJHNOTE: pivot support
    console.log(this.props);
    this.props.onToolAction(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y, 
      this.props.GridStore.keyList[this.props.GridStore.cursor.x],'ADDROW');
  }
  @action cutRow() {
    // JJHNOTE: pivot support
    this.props.onToolAction(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y,
      this.props.GridStore.keyList[this.props.GridStore.cursor.x],'CUTROW');
  }



  render() {

    var ui = this.uiMath.calcGridBody(this.props, (this.scrollBarWide||20));
    if(ui.notReady){
      
      return( 
      <div>
          <ScrollbarSize                               
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          /> 
          Loading...               
      </div>);
    }

    var header=[];
    var marginOffset=0;
    if (!this.props.colHeaderHide) {     // provide a header row.
      for(var ctr=0;ctr<ui.keyNames.length;ctr++){

        var titleText = ui.keyNames[ctr]; // what key am I on?
        if(this.props.GridStore.colDefList[titleText]){ // is there a colDef that uses this key?
          titleText = this.props.GridStore.colDefList[titleText].title || titleText; // if there is a title for the colDef use it, or just stick with thekey
        }
        // NOTE: check for header components here.

        header.push(  <div key={ctr} 
                          style={{
                            backgroundColor: '#F3F3F3',     // default, may be over ridden by styleHeader. Order matters.
                            textAlign:'center',             // default, may be over ridden by styleHeader. Order matters.
                            ...this.props.styleHeader,      // user specified styles.
                            width:ui.autoColWide,              // everything from here down cannot be over-ridden by the user.
                            borderStyle: 'solid',
                            borderWidth:ui.borderWideLocal,
                            padding: ui.padWideLocal+'px',
                            display:'inline-block', 
                            marginLeft:marginOffset,
                            height:ui.colHeaderHigh+'px'}}>
                        {titleText}
                      </div> );
        marginOffset=-1*ui.borderWideLocal;
      }
    }
    else{  // header is hidden so provide a top border line.
      header.push(<div style={{
        ...this.props.styleHeader,
        width: (ui.borderWideLocal + (ui.keyNames.length*(ui.autoColWide+ui.borderWideLocal+ui.padWideLocal+ui.padWideLocal)) + 'px'),
        borderTopStyle: 'solid', borderTopWidth: ui.borderWideLocal, height: '0px' }} />);
    }

    return (
        <div style={{height:ui.gridHighLocal}} onKeyPress={this.onKeyPress} onBlur={this.blurControl}>
          {/* ScrollbarSize gives the code information about how wide the scroll bar is */ }
          <ScrollbarSize                               
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>                          {/* put the header in place */}
          {/* VirtualList renders only the rows that are visible */ }
          <VirtualList
            width='100%'            
            height={ui.gridHighLocal - (ui.colHeaderHigh||0) -(ui.borderWideLocal*3) }
            itemCount={ui.fixedRowCount}
            itemSize={ui.rowHighWithPadLocal+ui.borderWideLocal}            

            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow  cellHigh={ui.rowHighNoPadLocal}
                          colHeaderHigh={ui.colHeaderHigh}
                          data={this.props.data}
                          GridStore={this.props.GridStore}
                          index={index} 
                          borderWide={ui.borderWideLocal} 
                          padWide={ui.padWideLocal} 
                          rowWide={ui.rowWide} 
                          autoColWide={ui.autoColWide} 
                          keyNames={ui.keyNames} 
                          styleInput={this.props.styleInput}
                          styleCell={this.props.styleCell}
                          rowHeaderList={ui.rowHeaderList}
                          pivotOn={this.props.pivotOn}
                          onChange={this.props.onChange}
                />
              </div>
            }
          />                    
      {ui.showBottomGridLine &&
        <div style={{ ...this.props.styleHeader,
                      width: (ui.borderWideLocal + (ui.keyNames.length*(ui.autoColWide+ui.borderWideLocal+ui.padWideLocal+ui.padWideLocal)) + 'px'),
                      borderTopStyle: 'solid',                      
                      borderTopWidth: ui.borderWideLocal,
                      height:'0px'}}/>
      }
        {this.props.showTools &&
          <div>
          <button onClick={this.addRow}>Add Row</button><button onClick={this.cutRow}>Cut Row</button>
          </div>
        }
      </div>
    );
  }
}


export default GridBody;