import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Testando componente Footer.js', () => {
  it('Verifica botões', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const btnDrink = screen.getByTestId('drinks-bottom-btn');
    const btnFood = screen.getByTestId('food-bottom-btn');

    expect(btnDrink).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();

    userEvent.click(btnDrink);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(btnFood);
    expect(history.location.pathname).toBe('/foods');
  });
});
