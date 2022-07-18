import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './pages/Login';
import renderWithRouter from './assets/functions/renderWithRouter';

describe('Pagina de Login', () => {
  it('Verifica se o titulo email esta na tela', () => {
    renderWithRouter(<Login />);
    const titleEmail = screen.getByText(/email/i);
    expect(titleEmail).toBeInTheDocument();
  });

  it('Verifica se o titulo senha esta na tela', () => {
    renderWithRouter(<Login />);
    const titleEmail = screen.getByText(/senha/i);
    expect(titleEmail).toBeInTheDocument();
  });

  it('Verifica se o botão esta desabilitado inicialmente', () => {
    renderWithRouter(<Login />);
    const botaoEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(botaoEntrar).toBeDisabled();
  });

  it('Verifica se o botão habilita ao digitar o email e senha', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'adalove@email.com');

    const inputSenha = screen.getByTestId('password-input');
    userEvent.type(inputSenha, 'adalove1');

    const botaoEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(botaoEntrar).toBeEnabled();
  });

  it('verifica se há um redirecionamento de página ao clicar no botão no Entrar',
    () => {
      const { history } = renderWithRouter(<Login />);
      const inputEmail = screen.getByTestId('email-input');
      userEvent.type(inputEmail, 'adalove@email.com');

      const inputSenha = screen.getByTestId('password-input');
      userEvent.type(inputSenha, 'adalove1');

      const botaoEntrar = screen.getByRole('button', { name: /entrar/i });
      userEvent.click(botaoEntrar);

      expect(history.location.pathname).toBe('/foods');
    });
});
