import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

describe('Test page Details Drinks', () => {
  it('Test if route `/meals` is rendered', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    await waitFor(() => {
      const firstElement = screen.getByTestId('0-recipe-card');
      expect(firstElement).toBeInTheDocument();
    }, 100);
  });

  it('Test if `RecipeDetails` is rendered by clicking on a recepie', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const firstElement = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstElement);

    const firstIngridient = await screen.findByText('Lentils - 1 cup');
    expect(firstIngridient).toBeInTheDocument();
  });
});
