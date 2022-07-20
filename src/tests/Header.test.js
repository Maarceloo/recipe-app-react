import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Header.js', () => {
  it('Verifica botões /foods', async () => {
    const { history } = renderWithRouter(Header, { route: '/foods', path: '/foods' });

    const btnUser = screen.getByRole('img', {
      name: /profile icon/i,
    });
    const btnSearch = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(btnUser).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(btnUser);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica botões /drinks', async () => {
    const { history } = renderWithRouter(Header, { route: '/drinks', path: '/drinks' });

    const btnUser = screen.getByRole('img', {
      name: /profile icon/i,
    });
    const btnSearch = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(btnUser).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(btnUser);
    expect(history.location.pathname).toBe('/profile');
  });
});
