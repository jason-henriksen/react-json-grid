import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action,trace } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';
import GridRow from './GridRow';
import GridMath from './GridMath';
import GridTextBox from './GridTextBox';
import ReactTooltip from 'react-tooltip';

import PlaylistRemoveIcon from 'mdi-react/PlaylistRemoveIcon';
import PlaylistPlusIcon from 'mdi-react/PlaylistPlusIcon';

import DatePickerOverlay from './easyTools/DatePickerOverlay';
import MenuPickerOverlay from './easyTools/MenuPickerOverlay';
import AltTextOverlay from './easyTools/AltTextOverlay';
import EasyBool from './easyTools/EasyBool';

// Wrapper for the grid
// This grid allows deep styling via style objects, 
// but retains control of border and padding to ensure that the grid lines up.
const GridBody = observer( class GridBody extends React.Component {
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
    // JJHNOTE: pivot support needed.  Will reuse column add/cut when that is built.
    this.props.GridStore.onRowAdd(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y, 
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }
  @action cutRow() {
    // JJHNOTE: pivot support needed.  Will reuse column add/cut when that is built.
    this.props.GridStore.onRowCut(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y,
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }

  render() {
    var ui = this.uiMath.calcGridBody(this.props, (this.scrollBarWide||20));
    if(this.props.debugGridMath){
      console.log(ui);
    }

    if(this.props.editAsText){
      // forget this complex grid nonsense.  Just make a big text area and edit the stuff that way.
      return(<GridTextBox {...this.props} uiMath={ui}/>);
    }

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
    var headerUsage=0;
    if (!this.props.colHeaderHide) {     // provide a header row.
      for(var ctr=0;ctr<ui.keyNames.length;ctr++){

        var keyName = ui.keyNames[ctr]; // what key am I on?
        var colTitle = keyName;
        var curColWide=ui.autoColWide;
        var helpComp=null;
        if(this.props.GridStore.colDefList[keyName]){ // is there a colDef that uses this key?
          colTitle = this.props.GridStore.colDefList[keyName].title || keyName; // if there is a title for the colDef use it, or just stick with thekey
          
          if (this.props.GridStore.colDefList[keyName].widePx) {        // width by px
            curColWide = this.props.GridStore.colDefList[keyName].widePx;
          }
          else if (this.props.GridStore.colDefList[keyName].widePct) {  // width by pct
            curColWide = ui.rowWide * (this.props.GridStore.colDefList[keyName].widePct/100);
          }

          if(this.props.pivotOn){                  // handle pivoted alt text.  Note that the 'text' could be a component.  regular header
            if(ctr>0){
              if (this.props.GridStore.colDefList[ this.props.GridStore.keyList[ctr-1] ].altText) { 
                helpComp = this.props.GridStore.colDefList[ this.props.GridStore.keyList[ctr-1] ].altText; 
              }
            }
          }
          else{// handle alt text.  Note that the 'text' could be a component.  regular header
            if (this.props.GridStore.colDefList[keyName].altText) { helpComp = this.props.GridStore.colDefList[keyName].altText; }
          }
        }
        // NOTE: check for header components here.
        if (ctr===0 && this.props.pivotOn && ui.pivotRowHeaderWide) {
          curColWide = Number(ui.pivotRowHeaderWide);
        }
        
        curColWide=curColWide+'px';

        header.push(  
          <a data-tip data-for={'dataTip' + ctr} key={ctr} >
                        <div
                          style={{
                            backgroundColor: '#F3F3F3',     // default, may be over ridden by styleHeader. Order matters.
                            textAlign:'center',             // default, may be over ridden by styleHeader. Order matters.
                            ...this.props.styleHeader,      // user specified styles.
                            width: curColWide,              // everything from here down cannot be over-ridden by the user.
                            maxWidth: curColWide,              // everything from here down cannot be over-ridden by the user.
                            borderStyle: 'solid',
                            borderWidth:ui.borderWide,
                            padding: ui.padWide+'px',
                            display:'inline-block', 
                            marginLeft:marginOffset,
                            overflow:'hidden',
                            boxSizing: 'content-box',
                            height:ui.colHeaderHigh+'px',
                            maxHeight:ui.colHeaderHigh+'px'}}>
                          {colTitle}
                          { helpComp &&  // only render this if helpComp is defined
                            <ReactTooltip id={'dataTip' + ctr} >
                              {helpComp}
                            </ReactTooltip>
                          }
                        </div>
                      </a>);
        marginOffset=-1*ui.borderWide;
      }
      headerUsage=(ui.colHeaderHigh+(2*ui.padWide)+(2*ui.borderWide));
    }
    else{  // header is hidden so provide a top border line.
      header.push(<div style={{
        ...this.props.styleHeader,
        width: (ui.borderWide + (ui.keyNames.length*(ui.autoColWide+ui.borderWide+ui.padWide+ui.padWide)) + 'px'),
        borderTopStyle: 'solid', borderTopWidth: ui.borderWide, height: '0px' }} />);
      headerUsage=1;
    }

    var retVal=
        <div style={{height:ui.gridHigh,width:ui.gridWide+'px'}} onKeyPress={this.onKeyPress} onBlur={this.blurControl}>
          {/* ScrollbarSize gives the code information about how wide the scroll bar is */ }
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          /> 
          {/* put the header in place */}
          <div style={{padding:'0px',margin:'0px',maxHeight:''+headerUsage+'px',minHeight:''+headerUsage+'px',height:''+headerUsage+'px'}}>
            {header}
          </div>

          {/* if needed, put the date picker overlay in place */}
          {(this.props.GridStore.showDatePicker||this.props.GridStore.showDateTimePicker) && <DatePickerOverlay GridStore={this.props.GridStore} uiMath={ui}/> }
          {(this.props.GridStore.showMenuPicker) && <MenuPickerOverlay GridStore={this.props.GridStore} uiMath={ui} />}
          <AltTextOverlay GridStore={this.props.GridStore} uiMath={ui}/>

          {/* VirtualList renders only the rows that are visible */ }
          <VirtualList
            width='100%'            
            height={ui.gridHigh - headerUsage }
            itemCount={ui.fixedRowCount}
            itemSize={ui.rowHighWithPad+ui.borderWide} 
            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow  data={this.props.data}
                          GridStore={this.props.GridStore}
                          styleInput={this.props.styleInput}
                          styleCell={this.props.styleCell}
                          styleRowHeader={this.props.styleRowHeader}
                          uiMath={ui}
                          pivotOn={this.props.pivotOn}
                          onChange={this.props.onChange}
                          index={index} 
                />
              </div>
            }
          />                    
      {ui.showBottomGridLine &&
        <div style={{ ...this.props.styleHeader,
                      width: (ui.rowWide+ 'px'),
                      borderTopStyle: 'solid',                      
                      borderTopWidth: ui.borderWide,
                      height:'0px'}}/>
      }
        {this.props.showToolsAddCut &&
          <div>
          <button onClick={this.addRow}><PlaylistPlusIcon/></button><button onClick={this.cutRow}><PlaylistRemoveIcon/></button>
          </div>
        }
      </div>
    
    return(retVal);
  }
})



export default GridBody;