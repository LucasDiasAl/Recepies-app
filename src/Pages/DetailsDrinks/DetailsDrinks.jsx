import React from 'react';
import RecipeDetails from '../../Components/RecipesDetails/RecipeDetails';
import Footer from '../../Components/Footer/Footer';

function DetailsDrinks() {
  return (
    <div className="DetailsMeals">
      <RecipeDetails page="drinks" img notPages="meals" />
      <Footer showDrinks />
    </div>
  );
}

export default DetailsDrinks;
