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
        <ContainerDimensions>
          <GridBody {...this.props} GridStore={this.GridStore}/>
        </ContainerDimensions>
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

