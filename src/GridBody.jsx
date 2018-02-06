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
    console.log("componentWillReceiveProps");
    if (this.props.GridStore) {
      var keyNames = [];
      var wide=0;
      var high=0;

      if (this.props.data && this.props.data.length > 0) {
        wide = Object.keys(this.props.data[0]).length;
        high = this.props.data.length;
      }
      if (this.props.GridStore.cursor.maxX !== wide-1 || this.props.GridStore.cursor.maxY!==high-1){
        this.props.GridStore.prepSelectionField(wide,high);
      }
    }
  }

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

    var colHeaderHeight = this.props.colHeaderHeight;
    if (-1 === colHeaderHeight) { colHeaderHeight = 23; }
    if (this.props.colHeaderHide) { colHeaderHeight = 0; }
    
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
      var actualDisplayHigh = (this.props.data.length*rowHeight)+colHeaderHeight;
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
                          style={{width:autoColWidth,
                          borderStyle: 'solid',
                          borderColor: 'black',
                          borderWidth:borderWidthLocal,
                                  display:'inline-block', marginLeft:marginOffset,height:colHeaderHeight+'px'}}>
                          {keyNames[ctr]}
                      </div> );
        marginOffset=-1*borderWidthLocal;
      }
    }
    else{
      header.push(<div style={{
        width: (rowWide - 1) + 'px',
        borderTopStyle: 'solid',
        borderTopColor: 'black',
        borderTopWidth: borderWidthLocal,
        height: '0px'
      }} />);
    }


    return (
        <div style={{height:gridHeightLocal}} onKeyPress={this.onKeyPress}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div>{header}</div>
          <VirtualList
            width='100%'            
            height={gridHeightLocal - colHeaderHeight -(borderWidthLocal*3) }
            itemCount={fixedRowCount}
            itemSize={rowHeight+borderWidthLocal}
            scrollToIndex={this.props.GridStore.cursor.y-5}
            renderItem={({ index, style }) => 
              <div key={index} style={style}>
                <GridRow rowHeight={rowHeight}
                         colHeaderHeight={colHeaderHeight}
                         data={this.props.data}
                         GridStore={this.props.GridStore}
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