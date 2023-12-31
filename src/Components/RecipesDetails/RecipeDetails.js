import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';

import RecipesCard from './RecipesCard';
import Instructions from './Instruction';
import Carousel from './Carousel';
import { Context } from '../../Context/Context';
import ShowReview from '../Review/showReview/ShowReview';

function RecipeDetails({ page, notPages }) {
  const [recomendation, setrecomendation] = useState([]);
  const [loading, setloading] = useState(false);
  const [keys, setKey] = useState('');
  const [pages, setpages] = useState('');
  const [recomendationP, setrecomendationP] = useState('');
  const { id } = useParams();
  const { handleCallApi, dataApi,
    ItemIngridients, Item, fetchItem } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (recomendation.length === 0) {
      if (page === 'meals') {
        setpages('Meal');
        setKey('Drink');
      } else {
        setpages('Drink');
        setKey('Meal');
      }
      fetchItem(page, id);
      const magicNumber = 6;
      handleCallApi('default', notPages).then(() => {
        const newValue = dataApi[notPages] === undefined
          ? [] : dataApi[notPages].slice(0, magicNumber) || [];
        setrecomendation(newValue);
        if (page === 'meals') {
          setrecomendationP('Drink');
        } else {
          setrecomendationP('Meal');
        }
      });
      setloading(true);
    }
  }, [fetchItem, page, notPages, dataApi, handleCallApi, recomendation, id]);

  return (
    <div className="Item-Details">
      <RecipesCard Item={ Item } pages={ pages } page={ page } loading={ loading } />

      <Instructions ItemIngridients={ ItemIngridients } page={ page } Item={ Item } />

      <div className="social-btn">
        <FacebookShareButton
          url={ `http://localhost:3000/${page}/${id}` }
          quote="One of my favorite recipes ...."
          hashtag="#Recipes..."
        >
          <FacebookIcon size={ 40 } round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={ `http://localhost:3000/${page}/${id}` }
          quote="One of my favorite recipes ...."
          hashtag="#Recipes..."
        >
          <WhatsappIcon size={ 40 } round />
        </WhatsappShareButton>
      </div>
      <h1>Review(s):</h1>
      <ShowReview id={ id } />
      <Carousel
        loading={ loading }
        recomendation={ recomendation }
        recomendationP={ recomendationP }
        keys={ keys }
      />

      <button
        type="button"
        className="btn-start-recepie"
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`/${page}/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
RecipeDetails.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecipeDetails;
