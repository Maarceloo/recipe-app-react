import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drink"
        />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          src={ mealIcon }
          alt="food"
        />
      </button>
    </footer>
  );
}

export default Footer;
