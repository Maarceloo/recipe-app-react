import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente SearchBar.jsx', () => {
  it('Verifica se busca funciona', async () => {
    const updateFilters = jest.fn();

    const { history } = renderWithRouter(Header, {
      route: '/foods',
      path: '/foods',
      providerValue: { updateFilters },
    });

    const btnSearch = screen.getByRole('button', {
      name: /search icon/i,
    });

    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    const optionRadio = screen.getByText(/ingredient/i);
    const submitBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Beef');
    userEvent.click(optionRadio);
    userEvent.click(submitBtn);

    expect(updateFilters).toHaveBeenCalled();
  });

  it('Verifica se alerta funciona', async () => {
    const { history } = renderWithRouter(Header, {
      route: '/foods',
      path: '/foods',
    });

    const btnSearch = screen.getByRole('button', {
      name: /search icon/i,
    });

    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    const optionRadio = screen.getByText(/first letter/i);
    const submitBtn = screen.getByTestId('exec-search-btn');

    window.alert = jest.fn();

    userEvent.type(searchInput, 'aaa');
    userEvent.click(optionRadio);
    userEvent.click(submitBtn);

    expect(window.alert).toHaveBeenCalled();
  });
});
