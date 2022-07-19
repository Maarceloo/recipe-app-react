import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { changeLocalStorage } from '../assets/hooks';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando a pagina Profile.js', () => {
  afterEach(() => {
    cleanup();
  });
  it('Verificando se elementos sao renderizados', async () => {
    changeLocalStorage('user', 'trybe@trybe.com', 'setUser');
    renderWithRouter(Profile, { path: '/profile', route: '/profile' });
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    localStorage.clear();

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  it('verifica se o botão para receitas feitas funciona corretamente', () => {
    const { history } = renderWithRouter(Profile, {
      path: '/profile',
      route: '/profile',
    });
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('verifica se o botão para receitas favoritas funciona corretamente', () => {
    const { history } = renderWithRouter(Profile, {
      path: '/profile',
      route: '/profile',
    });
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('verifica se o botão para logout funciona corretamente', () => {
    const { history } = renderWithRouter(Profile, {
      path: '/profile',
      route: '/profile',
    });
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
