import React from 'react';
import PropTypes from 'prop-types';
import GridBody from './GridBody';
import GridStore from './GridStore';
import Provider from 'mobx-react';
import autoBind from 'react-autobind';
import ScrollbarSize from 'react-scrollbar-size';

class Grid extends React.Component {


  constructor(props) { 
    super(props); 
    autoBind(this);
    this.scrollBarWide = 20;
    this.GridStore = new GridStore();
  }  

  setScrollBarWide(exp) { this.scrollBarWide = exp.scrollbarWidth+2; } // account for rounding error

  render(){
    return(
      <div  style={this.props.style}>
          <GridBody {...this.props} GridStore={this.GridStore} scrollBarWide={this.scrollBarWide}/>
      </div>
    );
  }
}

// Proptypes
Grid.propTypes = {
  rowCount: PropTypes.number,
  rowHigh: PropTypes.number,
  colHeaderHigh: PropTypes.number,
  colHeaderHide: PropTypes.bool,
  gridHigh: PropTypes.number,
};

// Default proptypes
Grid.defaultProps = {
};


export default Grid;

