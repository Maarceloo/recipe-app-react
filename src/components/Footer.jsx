import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { updateFilters } = useContext(AppContext);

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => {
          history.push('/drinks');
          updateFilters((old) => ({ ...old, recipeType: 'Drink' }));
        } }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </button>
      <button
        type="button"
        onClick={ () => {
          history.push('/foods');
          updateFilters((old) => ({ ...old, recipeType: 'Meal' }));
        } }
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </button>
    </footer>
  );
}

export default Footer;
