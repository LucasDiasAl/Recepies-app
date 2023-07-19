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
import blackHeart from '../../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';
import Footer from '../../Components/Footer/Footer';

function FavoriteRecipes() {
  const [done, setDone] = useState([]);
  const [pureData, setpureData] = useState([]);

  const navigate = useNavigate();

  const handleRemove = ({ target }) => {
    const idAlvo = target.name;
    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorites = oldFavorites.filter((item) => item.id !== idAlvo);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setpureData(newFavorites);
    setDone(newFavorites);
  };

  const handleAll = () => {
    setDone(pureData);
  };
  const handleMeal = () => {
    setDone(pureData);
    const filterMeal = pureData.filter((item) => item.type === 'meal');
    setDone(filterMeal);
  };
  const handleDrink = () => {
    const filterMeal = pureData.filter((item) => item.type === 'drink');
    setDone(filterMeal);
  };
  useEffect(() => {
    const getLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (data === null || undefined) {
        setDone([]);
        setpureData([]);
      } else {
        setDone(data);
        setpureData(data);
      }
    };
    getLocalStorage();
  }, []);

  const haveData = useMemo(() => done.length !== 0, [done]);

  return (
    <div className="FavoriteRecipes">
      <Header title="Favorite Recipes" perfilBool img />
      {
        !haveData
          ? <h1 style={ { textAlign: 'center' } }>Não tem receita favorita</h1>
          : (
            <form className="FavoriteRecipes__container">
              <div className="FavoriteRecipes__filter">
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
              <div className="FavoriteRecipes__container-item">
                {
                  done.map((recipe, index) => (
                    <div
                      data-aos="zoom-in"
                      data-aos-delay="50"
                      data-aos-duration="750"
                      data-aos-anchor-placement="top-center"
                      className="FavoriteRecipes__item-card"
                      key={ recipe.id }
                    >
                      <div
                        role="button"
                        tabIndex="0"
                        onKeyPress={ () => {} }
                        onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
                      >
                        <div className="FavoriteRecipes__Img">
                          <img
                            className="FavoriteRecipes-img"
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
                     - ${recipe.category}
                      - ${recipe.alcoholicOrNot}`
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
                        <h2
                          data-testid={ `${index}-horizontal-done-date` }
                          id={ recipe.doneDate }
                        >
                          { recipe.doneDate }
                        </h2>
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

                        <button
                          type="button"
                          name={ `share${index}` }
                          id={ `share${index}` }
                          onClick={ handleRemove }
                        >
                          <img
                            name={ recipe.id }
                            data-testid={ `${index}-horizontal-favorite-btn` }
                            src={ blackHeart }
                            alt="img de coração"
                          />
                        </button>
                      </div>
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
FavoriteRecipes.propTypes = {
  page: PropTypes.string,
}.isRequired;
export default FavoriteRecipes;
