import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';
import Header from '../../Components/Header/Header';
import './DoneRecipes.css';
import Footer from '../../Components/Footer/Footer';
import Review from '../../Components/Review/setReview/Review';

function DoneRecipes() {
  const [done, setDone] = useState([]);
  const [pureData, setPureData] = useState([]);

  const navigate = useNavigate();
  const handleAll = () => {
    setDone(pureData);
  };

  const handleMeal = () => {
    const filterMeal = pureData.filter((item) => item.type === 'meal');
    setDone(filterMeal);
  };

  const handleDrink = () => {
    const filterDrink = pureData.filter((item) => item.type === 'drink');
    setDone(filterDrink);
  };

  const haveData = useMemo(() => done.length !== 0, [done]);

  useEffect(() => {
    const getLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('doneRecipes'));
      if (data === null || data === undefined) {
        setDone([]);
        setPureData([]);
      } else {
        setDone(data);
        setPureData(data);
      }
    };

    getLocalStorage();
  }, []);

  return (
    <div className="DoneRecipes">
      <Header title="Done Recipes" perfilBool img />
      {
        !haveData
          ? (
            <h1
              className="DoneRecepies_noRecepies"
            >
              Nenhuma receita foi feita ainda...

            </h1>)
          : (
            <form className="DoneRecipes__container">
              <div className="DoneRecipes__filter">
                <button
                  data-testid="filter-by-all-btn"
                  type="button"
                  name="allBtn"
                  id="allBtn"
                  onClick={ handleAll }
                >
                  All
                </button>
                <button
                  data-testid="filter-by-meal-btn"
                  type="button"
                  name="mealBtn"
                  id="mealBtn"
                  onClick={ handleMeal }
                >
                  Meals
                </button>
                <button
                  data-testid="filter-by-drink-btn"
                  type="button"
                  name="drinkBtn"
                  id="drinkBtn"
                  onClick={ handleDrink }
                >
                  Drinks
                </button>
              </div>
              <div className="DoneRecipes__container-item">
                {
                  done.map((recipe, index) => (
                    <div
                      data-aos="zoom-in"
                      data-aos-delay="50"
                      data-aos-duration="750"
                      data-aos-anchor-placement="top-center"
                      className="DoneRecipes__item-card"
                      key={ recipe.id }
                    >
                      <div
                        role="button"
                        tabIndex="0"
                        onKeyPress={ () => {} }
                        onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
                      >
                        <div className="DoneRecipe__Img">
                          <img
                            className="Done-img"
                            data-testid={ `${index}-horizontal-image` }
                            src={ recipe.image }
                            alt={ recipe.name }
                          />

                        </div>
                      </div>
                      <label
                        htmlFor="category"
                      >
                        <h2
                          data-testid={ `${index}-horizontal-top-text` }
                          id={ recipe.category }
                        >
                          {
                            `${recipe.nationality} 
                    - ${recipe.category} - ${recipe.alcoholicOrNot}`
                          }
                        </h2>
                      </label>
                      <label
                        htmlFor="name"
                      >
                        <div
                          role="button"
                          tabIndex="0"
                          onKeyPress={ () => {} }
                          onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
                        >
                          <h2
                            data-testid={ `${index}-horizontal-name` }
                            id={ recipe.name }
                          >
                            { recipe.name }
                          </h2>
                        </div>
                      </label>
                      <label
                        htmlFor="doneDate"
                      >
                        <h6
                          data-testid={ `${index}-horizontal-done-date` }
                          id={ recipe.doneDate }
                        >
                          { recipe.doneDate }
                        </h6>
                      </label>
                      <div className="social-btn">
                        <FacebookShareButton
                          url={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
                          quote="One of my favorite recipes ...."
                          hashtag="#Recipes..."
                        >
                          <FacebookIcon size={ 40 } round />
                        </FacebookShareButton>

                        <WhatsappShareButton
                          url={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
                          quote="One of my favorite recipes ...."
                          hashtag="#Recipes..."
                        >
                          <WhatsappIcon size={ 40 } round />
                        </WhatsappShareButton>
                      </div>
                      <div>
                        <Review id={ recipe.id } />
                      </div>
                      {
                        recipe.tags.map((tag) => (
                          <h6
                            className="Done-tags"
                            key={ `${tag}-${index}` }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </h6>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </form>
          )
      }
      <Footer showMeals showDrinks />
    </div>
  );
}
DoneRecipes.propTypes = {
  page: PropTypes.string,
}.isRequired;
export default DoneRecipes;
