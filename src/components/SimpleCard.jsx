import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SimpleCard = ({ index, id, recipeType, thumb, name, testid }) => {
  const typeUrl = useMemo(
    () => (recipeType === 'Meal' ? 'foods' : 'drinks'),
    [recipeType],
  );

  return (
    <Link to={ `/${typeUrl}/${id}` } data-testid={ testid }>
      <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </Link>
  );
};

SimpleCard.defaultProps = {
  testid: 'not-required',
  index: 'not-required',
};

SimpleCard.propTypes = {
  index: PropTypes.number,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
};

export default SimpleCard;
