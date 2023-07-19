import React from 'react';
import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';
import Footer from '../../Components/Footer/Footer';
import './RecipeDrinks.css';

function RecipeDrinks() {
  return (
    <div className="RecipeDrinks">
      <RecipesInProg page="drinks" pages="Drink" />
      <Footer showDrinks />
    </div>
  );
}

export default RecipeDrinks;
