import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { observable,action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';
import {ContainerDimensions} from 'react-container-dimensions';


@observer class GridBody extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable scrollBarWide = 0;
  @action setScrollBarWide(exp) { this.scrollBarWide = exp.scrollbarWidth; }

  render() {
    const {title} = this.props;
    
    console.log('--- '+this.props.width);    
    console.log(this.scrollBarWide);
    var keyNames = Object.keys(this.props.data);
    console.log(keyNames.length);

    var autoColWidth = Math.floor(  ( this.props.width-
                                      this.scrollBarWide-                                      
                                      this.props.borderWidth
                                    )/keyNames.length );
    autoColWidth-=(this.props.borderWidth);
    console.log(autoColWidth);

    var header=[];
    var marginOffset=0;
    for(var ctr=0;ctr<keyNames.length;ctr++){
      header.push( <div key={ctr} style={{width:autoColWidth,border:'solid black',borderWidth:this.props.borderWidth,display:'inline-block', marginLeft:marginOffset}}>{keyNames[ctr]}</div> );
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
            height={this.props.gridHeight-this.props.rowHeaderHeight}
            itemCount={this.props.rowCount}
            itemSize={this.props.rowHeight}
            renderItem={({index, style}) =>
              <div key={index} style={style}>
                Row: #{index}
              </div>
            }
          />                    
        </div>
    );
  }
}


export default GridBody;