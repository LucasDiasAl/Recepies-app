import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

describe('Profile page tests', () => {
  const profilePath = '/profile';
  test('Test if icon profile is showed', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: '/meals' },
    );
    const perfilIcon = await screen.findByTestId('profile-top-btn');
    expect(perfilIcon).toBeInTheDocument();
  });

  test('Test if name `Profile` is showed', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const perfilImg = await screen.findByAltText('profile-pic');
    expect(perfilImg).toBeInTheDocument();
  });

  test('Test if email is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
  });

  test('Test if button `Done Recipes` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();
  });

  test('Test if button `Favorite Recipes` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeInTheDocument();
  });

  test('Test if button `Logout` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
  });

  test('Test if input `email` is valid', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const userEmail = screen.getByText(/\S+@\S+\.\S+/);
    expect(userEmail).toBeInTheDocument();
  });

  test('Test if when clicked in `Done Recipes` the route is changed', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);
    const noRecipestext = await screen.findByText('Done Recipes');
    expect(noRecipestext).toBeInTheDocument();
  });

  test('Test if when clicked in `Favorite Recipes` the route is changed', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes);

    const noRecipestext = await screen.findByText('Favorite Recipes');
    expect(noRecipestext).toBeInTheDocument();
  });

  test('Test if when clicked in `Logout` the route is changed', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { route: profilePath },
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const emailInput = await screen.findByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('Test if email is right', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456A');
    userEvent.click(btnLogin);
    setTimeout(() => {
      renderWithRouter(
        <Provider>
          <App />
        </Provider>,
        { route: profilePath },
      );
      const email = screen.getByTestId('profile-email');
      expect(email).toHaveTextContent('teste@gmail.com');
    });
  });
});
