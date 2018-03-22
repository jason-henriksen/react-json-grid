import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action,trace } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';
import GridRow from './GridRow';
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
  }

  @observable scrollBarWide = 0;              // keep track of how wide the scroll bar will be
  @action setScrollBarWide(exp) { this.props.GridStore.scrollBarWide = exp.scrollbarWidth+2; } // account for rounding error


  componentWillReceiveProps(nextProps)
  {
    if(nextProps.debugGridMath){
      console.log('componentWillReceiveProps');
    }
    
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
    var ui = this.props.GridStore.uiMath; 
    if(this.props.debugGridMath){
      console.log('render grid');
      console.log(ui);
    }

    if(this.props.editAsText){
      // forget this complex grid nonsense.  Just make a big text area and edit the stuff that way.
      return(<GridTextBox {...this.props} uiMath={ui}/>);
    }

    if(ui.notReady){
      
      return( 
      <div style={{backgroundColor:'#ffcea0',outline:'4px dashed red',padding:'5px'}}>
          <ScrollbarSize                               
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          /> 
          Sorry, this grid is not ready to display.<br/><br/>
          {ui.notReady}
      </div>);
    }

    var header=[];
    var marginOffset=0;
    if (!this.props.colHeaderHide && !ui.forceColHeaderHide) {     // provide a header row.
      for(var ctr=0;ctr<ui.colHeaderKeyList.length;ctr++){

        var keyName = ui.colHeaderKeyList[ctr]; // what key am I on?
        var colTitle = keyName;
        var curColWide=ui.autoColWide;
        var helpComp=null;
        if(this.props.GridStore.colDefListByKey[keyName]){ // is there a colDef that uses this key?
          if(this.props.pivotOn){                  
            //== Pivot, With ColDefs
            if(ctr>0){
              if (this.props.GridStore.colDefListByKey[ this.props.GridStore.keyList[ctr-1] ].altText) { 
                helpComp = this.props.GridStore.colDefListByKey[ this.props.GridStore.keyList[ctr-1] ].altText; 
              }
            }
            var targetCol = 0;
            for (var tctr = 0; tctr < ui.colHeaderKeyList.length; tctr++) {
              if (ui.colHeaderKeyList[tctr] === this.props.pivotOn) { targetCol = tctr; }// this is the header index matching the pivotOn key, offset by 1 due to leading '/'
            }
            colTitle = this.props.GridStore.getDataRespectingPivotAtLocation(this.props.data, ctr - 1, targetCol - 1);// both -1 are to account for the '/' in the header row.
            
          }
          else{
            //== NonPivot, With ColDefs
            if (this.props.GridStore.colDefListByKey[keyName].widePx) {        // width by px
              curColWide = this.props.GridStore.colDefListByKey[keyName].widePx;
            }
            else if (this.props.GridStore.colDefListByKey[keyName].widePct) {  // width by pct
              curColWide = ui.rowWide * (this.props.GridStore.colDefListByKey[keyName].widePct / 100);
            }

            colTitle = this.props.GridStore.colDefListByKey[keyName].title || keyName; // if there is a title for the colDef use it, or just stick with thekey
            if (this.props.GridStore.colDefListByKey[keyName].altText) { 
              // handle alt text.  Note that the 'text' could be a component.  regular header
              helpComp = this.props.GridStore.colDefListByKey[keyName].altText; 
            }
          }
        }
        else{ 
          if(this.props.pivotOn){ 
            // no column defs, Pivot On
            if(ctr>0){
              // find the index of the colDefListByKey item for the pivotOn target:
              var targetCol=0;
              for(var tctr=0;tctr<ui.colHeaderKeyList.length;tctr++){
                if(ui.colHeaderKeyList[tctr]===this.props.pivotOn){ targetCol=tctr; }// this is the header index matching the pivotOn key, offset by 1 due to leading '/'
              }
              colTitle = this.props.GridStore.getDataRespectingPivotAtLocation(this.props.data,ctr-1,targetCol-1);// both -1 are to account for the '/' in the header row.
            }
          }
          else{
            // no column defs, Pivot OFF
            if (this.props.GridStore.colDefListByKey && this.props.GridStore.colDefListByKey[keyName] && this.props.GridStore.colDefListByKey[keyName].altText) { 
              helpComp = this.props.GridStore.colDefListByKey[keyName].altText; 
            }
          }
        }

        // NOTE: check for header components here.
        if (ctr===0 && this.props.pivotOn && ui.pivotRowHeaderWide) {
          curColWide = Number(ui.pivotRowHeaderWide);
        }
        if(this.props.GridStore.colDefListByKey && this.props.GridStore.colDefListByKey[keyName] && this.props.GridStore.colDefListByKey[keyName].forceColWide){
          curColWide = this.props.GridStore.colDefListByKey[keyName].forceColWide;
        }
        curColWide=curColWide;

        header.push(  
          <a data-tip data-for={'dataTip' + ctr} key={ctr} >
                        <div  key={'k'+ctr}
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
    }
    else{  // header is hidden so provide a top border line.  The 2x borderWide extra width is needed because this is a top only border
      if(!ui.forceColHeaderHide){
        header.push(<div style={{
          key:'headerLine',
          ...this.props.styleHeader,
          width: ui.rowWide + (2 * ui.borderWide),
          minWidth: ui.rowWide + (2 * ui.borderWide),
          width: ui.rowWide + (2 * ui.borderWide),
          borderTopStyle: 'solid', borderTopWidth: ui.borderWide, height: '0px' }} />);
      }
    }

    return(
        <div style={{...this.props.style,
                     height:ui.gridHigh,
                     marginRight: ui.borderWide*5,
                     width:ui.gridWide}} 
                     onKeyPress={this.onKeyPress} onBlur={this.blurControl} key='scrollSize'>
          {/* ScrollbarSize gives the code information about how wide the scroll bar is */ }
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          /> 
          {/* put the header in place */}
          <div style={{padding:'0px',margin:'0px',maxHeight:''+ui.headerUsage+'px',minHeight:''+ui.headerUsage+'px',height:''+ui.headerUsage+'px'}}>
            {header}
          </div>

          {/* if needed, put the date picker overlay in place */}
          {(this.props.GridStore.showDatePicker||this.props.GridStore.showDateTimePicker) && <DatePickerOverlay GridStore={this.props.GridStore} uiMath={ui}/> }
          {(this.props.GridStore.showMenuPicker) && <MenuPickerOverlay GridStore={this.props.GridStore} uiMath={ui} />}
          <AltTextOverlay GridStore={this.props.GridStore} uiMath={ui}/>

          {/* VirtualList renders only the rows that are visible */ }
          <VirtualList
            width={ui.gridWide}
            height={ui.dataAvailableHigh}
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
              </div>}
          />                    
        {this.props.gridHighCollapse === false && ui.collapseAvailable>0 &&
          <div style={{
          minWidth: ui.rowWide,
          minWidth: ui.rowWide,
          width: ui.rowWide,
          marginTop: (-1 * ui.borderWide),
            height: (ui.collapseAvailable) ,
            minHeight: (ui.collapseAvailable),
            borderStyle: 'solid',
            borderLeftWidth: ui.borderWide,
            borderRightWidth: ui.borderWide,
            borderBottomWidth: ui.borderWide,
            borderTopWidth: 0, 
                  borderColor: 'black',
            backgroundColor:'white'}}/>
        }
          
        {ui.showBottomGridLine &&  // needs the 2x border wide added because this is only a top border
        <div style={{ ...this.props.styleHeader,
                      width: ui.rowWide + (2 * ui.borderWide),
                      minWidth: ui.rowWide + (2 * ui.borderWide),
                      width: ui.rowWide + (2 * ui.borderWide),
                      borderTopStyle: 'solid',                      
                      borderTopWidth: ui.borderWide,
                      height:'0px'}}/>
      }
      <div>      
        {this.props.showToolsAddCut &&
          <div style={{display:'inline-block'}}><button onClick={this.addRow}><PlaylistPlusIcon/></button><button onClick={this.cutRow}><PlaylistRemoveIcon/></button></div>
        }
        {this.props.showToolsImpExp &&
          <div style={{display:'inline-block'}}><button onClick={this.addRow}><PlaylistPlusIcon/></button><button onClick={this.cutRow}><PlaylistRemoveIcon/></button></div>
        }
        {this.props.showToolsPage &&
          <div style={{display:'inline-block'}}><button onClick={this.addRow}><PlaylistPlusIcon/></button><button onClick={this.cutRow}><PlaylistRemoveIcon/></button></div>
        }
        {this.props.showToolsCustom &&
          <div style={{display:'inline-block'}}><button onClick={this.addRow}><PlaylistPlusIcon/></button><button onClick={this.cutRow}><PlaylistRemoveIcon/></button></div>
        }
      </div>        
    </div>
    );
  }
})



export default GridBody;