import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';

test('Farewell, front-end', () => {
  render(<Login />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
