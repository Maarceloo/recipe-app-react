import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        // exact inserido em routes para evitar vazamento do footer em '/drinks/:id'
        // profile nao renderiza,caso localStorage vazio, erro requisito 17
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="food"
        />
      </button>
    </footer>
  );
}

export default Footer;
