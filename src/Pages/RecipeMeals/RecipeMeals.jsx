import React from 'react';
import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';
import Footer from '../../Components/Footer/Footer';
import './RecipeMeals.css';

function RecipeMeals() {
  return (
    <div className="RecipeMeals">
      <RecipesInProg page="meals" pages="Meal" />
      <Footer showMeals />
    </div>
  );
}

export default RecipeMeals;
