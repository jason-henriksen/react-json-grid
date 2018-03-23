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
import GridHeader from './GridHeader';
import GridTools from './GridTools';
import ReactTooltip from 'react-tooltip';

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

  // prep the data store
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

  render() 
  {
    // do a bunch of math to figure out where things should go.
    var ui = this.props.GridStore.uiMath; 

    // log what we're doing if asked to
    if(this.props.debugGridMath){
      console.log('render grid');
      console.log(ui);
    }

    // text view
    if(this.props.editAsText){      
      return(<GridTextBox {...this.props} uiMath={ui}/>); // forget this complex grid nonsense.  Just make a big text area and edit the stuff that way.
    }

    // error view
    if(ui.notReady){      
      return(   // something isn't ready.   Just drop an error and move on.
      <div style={{backgroundColor:'#ffcea0',outline:'4px dashed red',padding:'5px'}}>
          <ScrollbarSize                               
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          /> 
          Sorry, this grid is not ready to display.<br/><br/>
          {ui.notReady}
      </div>);
    }

    // the real stuff.  Release the Kraken...  I mean the Grid.
    return(
        <div style={{...this.props.style,
                     height:ui.gridHigh,
                     width:ui.gridWide}} 
                     onKeyPress={this.onKeyPress} onBlur={this.blurControl} key='scrollSize'>
          {/* ScrollbarSize gives the code information about how wide the scroll bar is */ }
          <ScrollbarSize onLoad={this.setScrollBarWide} onChange={this.setScrollBarWide} /> 

          {/* put the header in place */}
          <GridHeader uiMath={ui} {...this.props} />

          {/* Overlay Data Components:  if needed, put the date picker / menu picker overlay in place */}
          {(this.props.GridStore.showDatePicker||this.props.GridStore.showDateTimePicker) && <DatePickerOverlay GridStore={this.props.GridStore} uiMath={ui}/> }
          {(this.props.GridStore.showMenuPicker) && <MenuPickerOverlay GridStore={this.props.GridStore} uiMath={ui} />}

          {/* Column Header help text on mouse over */}
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
                          styleHeader={this.props.styleHeader}
                          styleRowHeader={this.props.styleRowHeader}
                          uiMath={ui}
                          pivotOn={this.props.pivotOn}
                          onChange={this.props.onChange}
                          index={index} 
                />
              </div>}
          />                    

          {/* Either keeps size and show a box to fill unused space, or just shrink the grid vertical space used. */ }          
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

          {/* Draw a bottom line if it is needed. */ }                      
          {ui.showBottomGridLine &&  // needs the 2x border wide added because this is only a top border
          <div style={{ ...this.props.styleHeader,
                        width: ui.rowWide + (2 * ui.borderWide),
                        minWidth: ui.rowWide + (2 * ui.borderWide),
                        width: ui.rowWide + (2 * ui.borderWide),
                        borderTopStyle: 'solid',                      
                        borderTopWidth: ui.borderWide,
                        height:'0px'}}/>
          }

          {/* Render any tools that are enabled. */ }                      
          <GridTools  {...this.props} uiMath={ui}/>

    </div>
    );
  }
})



export default GridBody;