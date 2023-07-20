import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

describe('Test page Details Drinks', () => {
  it('Test if route `/drinks` is rendered', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/drinks' },
    );
    await waitFor(() => {
      const firstElement = screen.getByTestId('0-recipe-card');
      expect(firstElement).toBeInTheDocument();
    });
  });

  it('Test if route `/recipe-details` is changed when click in element', async () => {
    const { user } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/drinks' },
    );
    const firstElement = await screen.findByTestId('0-recipe-card');
    user.click(firstElement);

    const firstIngridient = await screen.findByText('Galliano - 2 1/2 shots');
    expect(firstIngridient).toBeInTheDocument();
  });
});
