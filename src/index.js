import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import GridBody from './GridBody';


class Grid extends React.Component {
  render(){
    return(
      <ContainerDimensions>
        <GridBody {...this.props}/>
      </ContainerDimensions>
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


export default Grid;

