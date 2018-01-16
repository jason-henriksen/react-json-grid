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

  makeValidInt(inputVal,defaultVal){
    var res = (inputVal||defaultVal);
    if(inputVal===0){res=inputVal;}
    if(res<0){ res = defaultVal; }
    return res;
  }

  render() {
    const {title} = this.props;

    var borderWidthLocal = this.makeValidInt(this.props.borderWidth,1);

    var rowWide = this.props.width - this.scrollBarWide;
    var autoColWidth = 0; // width of the default filled column, before weights
    var fixedRowCount = this.props.rowCount;
    var keyNames=[];

    var rowHeight = this.props.rowHeight;
    if(-1===rowHeight){rowHeight=23;}

    var rowHeaderHeight = this.props.rowHeaderHeight;
    if (-1 === rowHeaderHeight) { rowHeaderHeight = 23; }
    
    var gridHeightLocal = this.props.gridHeight || this.props.height || 300;
    if (gridHeightLocal === -1) {
      gridHeightLocal = this.props.height || 300;
    }

    var showBottomGridLine=true;

    if(this.props.data && this.props.data.length>0){
      keyNames = Object.keys(this.props.data[0]);
      if(this.props.rowCount!=this.props.data.length){
        fixedRowCount = this.props.data.length;
      }
      autoColWidth = Math.floor((this.props.width -
        this.scrollBarWide -
        borderWidthLocal
      ) / keyNames.length);
      autoColWidth -= (borderWidthLocal);

      // check wether to show the bottom line
      var actualDisplayHigh = (this.props.data.length*rowHeight)+rowHeaderHeight;
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
    for(var ctr=0;ctr<keyNames.length;ctr++){
      header.push(  <div key={ctr} 
                        style={{width:autoColWidth,
                        borderStyle: 'solid',
                        borderColor: 'black',
                        borderWidth:borderWidthLocal,
                                display:'inline-block', marginLeft:marginOffset,height:rowHeaderHeight+'px'}}>
                        {keyNames[ctr]}
                    </div> );
      marginOffset=-1*borderWidthLocal;
    }


    return (
        <div style={{height:gridHeightLocal}}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>
          <VirtualList
            width='100%'            
            height={gridHeightLocal - rowHeaderHeight -(borderWidthLocal*3) }
            itemCount={fixedRowCount}
            itemSize={rowHeight+borderWidthLocal}
            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow rowHeight={rowHeight}
                         rowHeaderHeight={rowHeaderHeight}
                         data={this.props.data}
                         index={index} borderWidth={borderWidthLocal} rowWide={rowWide} autoColWidth={autoColWidth} keyNames={keyNames} />
              </div>
            }
          />                    
{showBottomGridLine &&
        <div style={{ width: (rowWide-1)+'px',
                      borderTopStyle: 'solid',
                      borderTopColor: 'black',
                      borderTopWidth: borderWidthLocal,
                      height:'0px'}}/>
}
      </div>
    );
  }
}


export default GridBody;