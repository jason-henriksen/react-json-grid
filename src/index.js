import React from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions'
import VirtualList from 'react-tiny-virtual-list';
import { observable,action } from 'mobx';
import { observer } from 'mobx-react';
import ScrollbarSize from 'react-scrollbar-size';
import autoBind from 'react-autobind';

@observer class Grid extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable scrollBarWide = 0;
  @action setScrollBarWide(exp) { this.scrollBarWide = exp; console.log(exp); }

  render() {
  	const {title} = this.props;
    return (
        <div style={{height:this.props.gridHeight}}>
          <ScrollbarSize
            onLoad={this.setScrollBarWide}
            onChange={this.setScrollBarWide}
          />        
          <div style={{height:this.props.rowHeaderHeight}}>{title} {this.props.containerWidth} x {this.props.containerHeight}</div>
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

// Proptypes
Grid.propTypes = {
  title: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  rowHeight: PropTypes.number,
  rowHeaderHeight: PropTypes.number,
  gridHeight: PropTypes.number,
};

// Default proptypes
Grid.defaultProps = {
  title: "Hello Watch"
};

export default Dimensions()(Grid);

