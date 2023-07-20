import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { DoneRecipes } from '../Pages';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';
import App from '../App';

describe('Footer component tests', () => {
  test('Test if footer component and icons are rendered', () => {
    renderWithRouter(
      <Provider>
        <DoneRecipes />
      </Provider>,
    );
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    expect(mealsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
  });

  test('Test if route is changed when click on link `Meals`', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/drinks' },
    );
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    act(() => {
      userEvent.click(mealsIcon);
    });

    const firstCard = await screen.findByTestId('0-card-name');
    expect(firstCard.innerHTML).toBe('Corba');
  });

  test('Test if route is changed when click on link `Drinks`', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);

    const firstCard = await screen.findByTestId('0-card-name');
    expect(firstCard.innerHTML).toBe('GG');
  });
});
