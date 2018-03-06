import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import GridBody from './GridBody';
import GridStore from './GridStore';
import Provider from 'mobx-react';
import autoBind from 'react-autobind';

 

class Grid extends React.Component {


  constructor(props) { 
    super(props); 
    autoBind(this);
    this.GridStore = new GridStore();
  }  

  render(){
    return(
      <div  style={this.props.style}>
        <ContainerDimensions>
          <GridBody {...this.props} GridStore={this.GridStore}/>
        </ContainerDimensions>
      </div>
    );
  }
}

// Proptypes
Grid.propTypes = {
  title: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  rowHigh: PropTypes.number,
  colHeaderHigh: PropTypes.number,
  colHeaderHide: PropTypes.bool,
  gridHigh: PropTypes.number,
};

// Default proptypes
Grid.defaultProps = {
  title: "Hello Watch"
};


export default Grid;

