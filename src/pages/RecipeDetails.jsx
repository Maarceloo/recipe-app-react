import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncEffect } from '../assets/hooks';
import { fetchData } from '../assets/api';

const RecipeDetails = ({ match }) => {
  const {
    params: { id },
    url,
  } = match;
  const [recipe, setRecipe] = useState('');
  const recipeType = url.includes('foods') ? 'Meal' : 'Drink';

  useAsyncEffect(async () => {
    await fetchData
      .detail({ recipeType, id })
      .then((info) => setRecipe(info[0]));
  }, [id, url]);
  return (
    <section>
      <img
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ recipe[`str${recipeType}`] }
        data-testid="recipe-photo"
      />
      <h2>{recipe[`str${recipeType}`]}</h2>
      {/* <p>{recipeType === 'Meal' ? }</p> */}

      <p>{id}</p>
      {recipe !== '' && <p>{recipe[`str${recipeType}`]}</p>}
    </section>
  );
};

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
