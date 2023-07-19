import React from 'react';
import RecipeDetails from '../../Components/RecipesDetails/RecipeDetails';
import Footer from '../../Components/Footer/Footer';

function DetailsMeals() {
  return (
    <div className="DetailsMeals">
      <RecipeDetails page="meals" img notPages="drinks" />
      <Footer showMeals />
    </div>
  );
}

export default DetailsMeals;
