import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

const startRecipe = 'start-recipe-btn';
const drinksURl = '/drinks/15997';

const searchButton = 'search-top-btn';

describe('RecipeDetails page tests', () => {
  test('Test if only 1 element is called goes to page details`', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const inputRadioName = screen.getByTestId('name-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.click(inputRadioName);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(btnCall);

    const recipeTitle = await screen.findByText('Spicy Arrabiata Penne');
    expect(recipeTitle).toBeInTheDocument();
  });
  test('Test if only 1 element is called goes to page details`', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const firstElement = await screen.findByTestId(
      '0-recipe-card',
      {},
      { timeout: 4000 },
    );
    expect(firstElement).toBeInTheDocument();

    userEvent.click(firstElement);

    const recipeTitle = await screen.findByText('Corba');
    expect(recipeTitle).toBeInTheDocument();
  });
  test('Test if drinks route is render with key Drink', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const divDrinks = await screen.findByTestId(
      'Recipe__container-cards',
      {},
      { timeout: 4000 },
    );
    expect(divDrinks).toBeInTheDocument();
  });

  test('Test if meals route is render with key Meal', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const divMeals = await screen.findByTestId(
      'Recipe__container-cards',
      {},
      { timeout: 4000 },
    );
    expect(divMeals).toBeInTheDocument();
  });
});

test('Test if no recipes is found it remains on the meals page', async () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    { route: '/meals' },
  );
  const searchBtn = screen.getByTestId(searchButton);
  userEvent.click(searchBtn);
  const inputRadioName = screen.getByTestId('name-search-radio');
  const searchInput = screen.getByTestId('search-input');
  const btnCall = screen.getByTestId('exec-search-btn');

  userEvent.click(inputRadioName);
  userEvent.type(searchInput, 'Aquamarine');
  userEvent.click(btnCall);

  const title = await screen.findByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Meals');
});

test('Test if sends to in progress for drinks', async () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    { route: drinksURl },
  );
  const start = screen.getByTestId(startRecipe);
  userEvent.click(start);

  const firstStep = await screen.findByLabelText('Galliano2 1/2 shots');
  expect(firstStep).toBeInTheDocument();
});

test('Test if sends to in progress for meals', async () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    { route: '/meals/52977' },
  );
  const start = screen.getByTestId(startRecipe);
  userEvent.click(start);

  const firstStep = await screen.findByLabelText('Lentils1 cup');
  expect(firstStep).toBeInTheDocument();
});

describe('testa os componentes da tela de ingredientes', () => {
  test('testa se o ingredientes aparecem da forma correta', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/drinks' },
    );
    const firstElement = await screen.findByTestId('0-recipe-card');
    expect(firstElement).toBeInTheDocument();

    userEvent.click(firstElement);

    const instruction = await screen.findByTestId(
      '0-ingredient-name-and-measure',
    );
    expect(instruction).toBeInTheDocument();

    expect(instruction.innerHTML).toBe('Galliano - 2 1/2 shots ');
  });
  test('testa se o carousel de recomendacoes existe', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: drinksURl },
    );

    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });

  test('testa se o localStorage funciona', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals/52771' },
    );
    localStorage.clear();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    await waitFor(() => {
      const getLocalStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      expect(favoriteBtn).toBeInTheDocument();
      expect(getLocalStorage.length).toBe(1);
    });
  });
});
