import React from 'react';
import PropTypes from 'prop-types';

const SimpleCard = ({ thumb, name }) => (
  <div>
    <img src={ thumb } alt={ name } />
    <h3>{name}</h3>
  </div>
);

SimpleCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SimpleCard;
