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
  constructor(props) { super(props); autoBind(this); }

  @observable scrollBarWide = 0;
  @action setScrollBarWide(exp) { this.scrollBarWide = exp.scrollbarWidth+2; } // account for rounding error

  render() {
    const {title} = this.props;
    var rowWide = this.props.width - this.scrollBarWide;
    var autoColWidth = 0; // width of the default filled column, before weights
    var fixedRowCount = this.props.rowCount;
    var keyNames=[];
    if(this.props.data && this.props.data.length>0){
      keyNames = Object.keys(this.props.data[0]);
      if(this.props.rowCount!=this.props.data.length){
        fixedRowCount = this.props.data.length;
      }

      autoColWidth = Math.floor((this.props.width -
        this.scrollBarWide -
        this.props.borderWidth
      ) / keyNames.length);
      autoColWidth -= (this.props.borderWidth);
    }
    else if(this.props.getRowData){
      autoColWidth=
        this.props.width -
        this.scrollBarWide -
        (this.props.borderWidth*2);
      keyNames = ["No Data Provided"];
    }
    else{
      autoColWidth =
        this.props.width -
        this.scrollBarWide -
        (this.props.borderWidth * 2);
      keyNames = ["No Data Provided"];
    }

    var header=[];
    var marginOffset=0;
    for(var ctr=0;ctr<keyNames.length;ctr++){
      header.push(  <div key={ctr} 
                        style={{width:autoColWidth,border:'solid black',borderWidth:this.props.borderWidth,
                                display:'inline-block', marginLeft:marginOffset,height:this.props.rowHeaderHeight+'px'}}>
                        {keyNames[ctr]}
                    </div> );
      marginOffset=-1*this.props.borderWidth;
    }

    return (
        <div style={{height:this.props.gridHeight}}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>
          <VirtualList
            width='100%'            
            height={this.props.gridHeight - this.props.rowHeaderHeight -(this.props.borderWidth*3) }
            itemCount={fixedRowCount}
            itemSize={this.props.rowHeight+this.props.borderWidth}
            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow {...this.props} index={index} rowWide={rowWide} autoColWidth={autoColWidth} keyNames={keyNames} />
              </div>
            }
          />                    
          <div style={{ width: (rowWide-1)+'px',
                      borderBottom: this.props.borderWidth + 'px solid black',
                      height:'0px'}}/>
        </div>
    );
  }
}


export default GridBody;