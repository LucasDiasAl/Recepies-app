import React from 'react';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Recipes from '../../Components/Recipes';
import Category from '../../Components/Category';
import './Meals.css';

function Meals() {
  return (
    <div className="Meals">
      <Header title="Meals" perfilBool searchBool type="meals" img />
      <Category page="meals" />
      <Recipes page="meals" />
      <Footer showDrinks />
    </div>
  );
}

export default Meals;
