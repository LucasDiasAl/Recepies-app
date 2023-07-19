import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import {
  Login,
  Meals,
  DoneRecipes,
  FavoriteRecipes,
  Profile,
  Drinks,
  DetailsDrinks,
  DetailsMeals,
  RecipeMeals,
  RecipeDrinks,
} from './Pages';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function App() {
  AOS.init();
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route exact path="/meals" element={ <Meals /> } />
      <Route exact path="/meals/:id" element={ <DetailsMeals /> } />
      <Route exact path="/meals/:id/in-progress" element={ <RecipeMeals /> } />
      <Route exact path="/drinks" element={ <Drinks /> } />
      <Route exact path="/drinks/:id" element={ <DetailsDrinks /> } />
      <Route exact path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route exact path="/drinks/:id/in-progress" element={ <RecipeDrinks /> } />
      <Route exact path="/done-recipes" element={ <DoneRecipes /> } />
      <Route exact path="/profile" element={ <Profile /> } />
    </Routes>

  );
}
export default App;
