import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Meals } from '../Pages';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

describe('Categoreis component tests', () => {
  test('Testa se as receitas sao renderizadas de acordo com a categoria', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const beefCat = await screen.findByTestId('Beef-category-filter');
    const breakfastCat = await screen.findByTestId('Breakfast-category-filter');

    userEvent.click(beefCat);
    const beefRecepie = await screen.findByAltText('Beef and Mustard Pie');
    expect(beefRecepie).toBeInTheDocument();

    userEvent.click(breakfastCat);

    const breakfastRecepie = await screen.findByAltText('Breakfast Potatoes');

    expect(breakfastRecepie).toBeInTheDocument();
  });
});
