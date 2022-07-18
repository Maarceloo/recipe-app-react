import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';
import { useLocalStorage } from '../assets/hooks';

describe('Testando a pagina Profile.js', () => {
  it('Verificando se elementos sao renderizados', async () => {
    const history = createMemoryHistory();
    useLocalStorage('user', 'trybe@trybe.com', 'setUser');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    localStorage.clear();

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
