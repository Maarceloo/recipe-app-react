import React from 'react';
import PropTypes from 'prop-types';


const SimpleCard = ({ thumb, name, testid }) => (
  <div data-testid={ testid }>
    <img src={ thumb } alt={ name } />
    <h3>{name}</h3>
  </div>
);

SimpleCard.defaultProps = {
  testid: 'not-required',
};

SimpleCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
};

export default SimpleCard;
