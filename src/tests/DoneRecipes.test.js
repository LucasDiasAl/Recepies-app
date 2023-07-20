import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

const pathRecipes = '/done-recipes';
const pathHorizontal = '0-horizontal-name';
const dataMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Done Recipes page tests', () => {
  test('Test if pathname `/done-recipes` exists', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/profile' },
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);

    const title = screen.getByTestId('page-title');
    expect(title.innerHTML).toBe('Done Recipes');
  });

  test('Test if text `Done Recipes` is rendered 2', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: pathRecipes },
    );
    const title = await screen.findByTestId('page-title');
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    const mealBtn = await screen.findByTestId('filter-by-meal-btn');
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const image1 = await screen.findByTestId('0-horizontal-image');
    const text = await screen.findByTestId('0-horizontal-top-text');
    const name = await screen.findByTestId('0-horizontal-name');
    const date = await screen.findByTestId('0-horizontal-done-date');
    const tags = await screen.findByTestId('0-Pasta-horizontal-tag');

    expect(title).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    userEvent.click(allBtn);
    userEvent.click(mealBtn);
    expect(name.id).toBe('Spicy Arrabiata Penne');
    userEvent.click(image1);

    const recipeCategory = await screen.findByText('Category: Vegetarian');
    expect(recipeCategory).toBeInTheDocument();
  });

  test('Test if text `Done Recipes` is rendered', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: pathRecipes },
    );
    const name = screen.getByTestId(pathHorizontal);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const recipeCategory = await screen.findByText('Category: Vegetarian');
    expect(recipeCategory).toBeInTheDocument();
  });

  test('Test if text `Done Recipes` is rendered', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: pathRecipes },
    );
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const name = screen.getByTestId(pathHorizontal);

    expect(drinkBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const image1 = screen.getByTestId('0-horizontal-image');
    const drink = await screen.findByText(/Aquamarine/i, {}, { timeout: 4000 });
    expect(drink).toBeInTheDocument();
    userEvent.click(image1);
    const alcool = await screen.findByText(/Alcoholic/i, {}, { timeout: 4000 });
    expect(alcool).toBeInTheDocument();
  });
});
