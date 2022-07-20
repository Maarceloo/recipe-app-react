import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWithRouter';
import alternativeRenderWithRouter from './helpers/alternativeRenderWithRouter';
import { FOOD_RECIPES } from './mocks/FOOD_RECIPES';
import { DRINK_RECIPES } from './mocks/DRINK_RECIPES';
import { BEEF_RECIPES } from './mocks/BEEF_RECIPES';
import { ORDINARY_DRINKS_RECIPES } from './mocks/ORDINARY_DRINKS_RECIPES';
import parseRecipe from '../assets/functions/parseRecipe';

const baseFetch = global.fetch;
beforeEach(() => (global.fetch = baseFetch));

describe('Testando página Recipes.jsx com /foods', () => {
  it('Verifica se 12 itens são mostrados na página', async () => {
    const { history } = renderWithRouter(Recipes, {
      route: '/foods',
      path: '/foods',
      providerValue: { recipes: FOOD_RECIPES },
    });

    const card12 = screen.getByTestId('11-recipe-card');

    expect(card12).toBeInTheDocument();
  });

  it('Verifica se com 1 item a página é redirecionada', async () => {
    const { history } = renderWithRouter(Recipes, {
      route: '/foods',
      path: '/foods',
      providerValue: { recipes: [FOOD_RECIPES[0]] },
    });

    await new Promise((r) => setTimeout(r, 1000));

    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('Verifica se com 0 itens um alerta é disparado', async () => {
    window.alert = jest.fn();

    const { history } = alternativeRenderWithRouter(<App />);

    history.push('/foods');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    );

    await new Promise((r) => setTimeout(r, 1000));

    expect(window.alert).toHaveBeenCalled();
  });

  it('Verifica se ao clicar na categoria novos dados são buscados', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/foods');

    const beefBtn = await screen.findByRole('button', {
      name: /beef/i,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(BEEF_RECIPES),
      }),
    );

    userEvent.click(beefBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
    );
  });

  it('Verifica se ao clicar na categoria duas vezes a busca reseta', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/foods');

    const beefBtn = await screen.findByRole('button', {
      name: /beef/i,
    });

    userEvent.click(beefBtn);

    const card0Before = await screen.findByRole('heading', {
      name: /beef and mustard pie/i,
    });

    expect(card0Before).toBeInTheDocument();

    userEvent.click(beefBtn);
    const card0After = await screen.findByRole('heading', {
      name: /corba/i,
    });

    expect(card0After).toBeInTheDocument();
  });

  it('Verifica se ao clicar no all a busca reseta', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/foods');

    const beefBtn = await screen.findByRole('button', {
      name: /beef/i,
    });

    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });

    userEvent.click(beefBtn);

    const card0Before = await screen.findByRole('heading', {
      name: /beef and mustard pie/i,
    });

    expect(card0Before).toBeInTheDocument();

    userEvent.click(allBtn);
    const card0After = await screen.findByRole('heading', {
      name: /corba/i,
    });

    expect(card0After).toBeInTheDocument();
  });

  it('Verifica se com objeto sem id o map não roda', async () => {
    window.alert = jest.fn();

    const { history } = alternativeRenderWithRouter(<App />);

    history.push('/foods');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{idMeal: undefined}, {idMeal: undefined}]),
      }),
    );

    const card0 = screen.queryByText(/corba/i);

    expect(card0).not.toBeInTheDocument();
  });
});

describe('Testando página Recipes.jsx com /drinks', () => {
  it('Verifica se 12 itens são mostrados na página', async () => {
    const { history } = renderWithRouter(Recipes, {
      route: '/drinks',
      path: '/drinks',
      providerValue: { recipes: DRINK_RECIPES },
    });

    const card12 = screen.getByTestId('11-recipe-card');

    expect(card12).toBeInTheDocument();
  });

  it('Verifica se com 1 item a página é redirecionada', async () => {
    const { history } = renderWithRouter(Recipes, {
      route: '/drinks',
      path: '/drinks',
      providerValue: { recipes: [DRINK_RECIPES[0]] },
    });

    await new Promise((r) => setTimeout(r, 1000));

    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Verifica se com 0 itens um alerta é disparado', async () => {
    window.alert = jest.fn();

    const { history } = alternativeRenderWithRouter(<App />);

    history.push('/drinks');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    );

    await new Promise((r) => setTimeout(r, 1000));

    expect(window.alert).toHaveBeenCalled();
  });

  it('Verifica se ao clicar na categoria novos dados são buscados', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/drinks');

    const ordinaryDrinksBtn = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(ORDINARY_DRINKS_RECIPES),
      }),
    );

    userEvent.click(ordinaryDrinksBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink',
    );
  });

  it('Verifica se ao clicar na categoria duas vezes a busca reseta', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/drinks');

    const ordinaryDrinksBtn = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });

    userEvent.click(ordinaryDrinksBtn);

    const card0Before = await screen.findByRole('heading', {
      name: /3\-mile long island iced tea/i,
    });

    expect(card0Before).toBeInTheDocument();

    userEvent.click(ordinaryDrinksBtn);
    const card0After = await screen.findByRole('heading', {
      name: /gg/i,
    });

    expect(card0After).toBeInTheDocument();
  });

  it('Verifica se ao clicar no all a busca reseta', async () => {
    const { history } = alternativeRenderWithRouter(<App />);
    history.push('/drinks');

    const ordinaryDrinksBtn = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });

    const allBtn = await screen.findByRole('button', {
      name: /all/i,
    });

    userEvent.click(ordinaryDrinksBtn);

    const card0Before = await screen.findByRole('heading', {
      name: /3\-mile long island iced tea/i,
    });

    expect(card0Before).toBeInTheDocument();

    userEvent.click(allBtn);
    const card0After = await screen.findByRole('heading', {
      name: /gg/i,
    });

    expect(card0After).toBeInTheDocument();
  });
});
