import React from 'react';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Recipes from '../../Components/Recipes';
import Category from '../../Components/Category';
import '../Meals/Meals.css';

function Drinks() {
  return (
    <div className="Drinks">
      <Header title="Drinks" perfilBool searchBool type="drinks" img />
      <Category page="drinks" />
      <Recipes page="drinks" />
      <Footer showMeals />
    </div>
  );
}

export default Drinks;
