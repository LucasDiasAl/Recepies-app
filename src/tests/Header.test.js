import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';
import App from '../App';

const searchButton = 'search-top-btn';

describe('Header component tests', () => {
  test('Test Header is render and changes to route profile', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId(searchButton);

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();

    userEvent.click(searchLink);
    const searchInput = screen.getByTestId(searchButton);
    expect(searchInput).toBeInTheDocument();

    userEvent.click(profileLink);
    const logoutText = await screen.findByText('Logout');
    expect(logoutText).toBeInTheDocument();

    const doneRecipesText = await screen.findByText('Done Recipes');
    expect(doneRecipesText).toBeInTheDocument();

    const favoriteRecipesText = await screen.findByText('Favorite Recipes');
    expect(favoriteRecipesText).toBeInTheDocument();
  });

  test('Test Header is render and click on search creates input-search', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId(searchButton);

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();

    userEvent.click(searchLink);
    const searchInput = screen.getByTestId('search-input');

    const inputRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const inputRadioName = screen.getByTestId('name-search-radio');
    const inputRadioFirst = screen.getByTestId('first-letter-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(inputRadioIngredient).toBeInTheDocument();
    expect(inputRadioName).toBeInTheDocument();
    expect(inputRadioFirst).toBeInTheDocument();
    expect(btnCall).toBeInTheDocument();
    userEvent.click(inputRadioName);
    userEvent.click(inputRadioFirst);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(inputRadioIngredient);
    userEvent.click(btnCall);

    const card0 = await screen.findByText(
      /Brown Stew Chicken/i,
      {},
      { timeout: 4000 },
    );
    expect(card0).toBeInTheDocument();
  });
  test('Test input is sent to state', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/drinks' },
    );
    const search = screen.getByTestId(searchButton);
    expect(search).toBeInTheDocument();
    userEvent.click(search);
  });
});
