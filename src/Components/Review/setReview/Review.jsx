import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';
import './Review.css';

export default function Review({ id }) {
  const [rating, setRating] = useState(0);
  const [rateText, setRateText] = useState('');
  const [showRate, setShowRate] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const setReviewToLocalStorage = () => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    const { email } = getEmail;
    const review = {
      id,
      rate: rating,
      text: rateText,
      email,
    };
    const get = localStorage.getItem('review');
    const parse = JSON.parse(get) || [];
    localStorage.setItem('review', JSON.stringify([...parse, review]));
    setShowRate(false);
  };

  const handleRateText = ({ target }) => {
    const MINIMAL_LENGTH = 3;
    const { value } = target;
    setRateText(value);
    if (value.length > MINIMAL_LENGTH && rating > 0) {
      setIsBtnDisabled(false);
    }
  };

  const handleRating = (number) => {
    const MINIMAL_LENGTH = 3;
    setRating(number);
    if (number > 0 && rateText.length > MINIMAL_LENGTH) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };
  const enableEditReview = () => {
    setShowRate(true);
  };
  useEffect(() => {
    const get = localStorage.getItem('review');
    const parse = JSON.parse(get) || [];
    if (parse.find((i) => i.id === id)) {
      setShowRate(false);
    }
  }, [id]);

  return (
    <div>
      {
        showRate
          ? (
            <div className="Review__rate-card">
              <div>
                <h1
                  className="Review__rate-title"
                >
                  Rate this recipe

                </h1>
                <div className="starReview">
                  <Rating
                    iconsCount={ 5 }
                    onClick={ handleRating }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="rateInputText"
                >
                  <textarea
                    className="Review__rate-textarea"
                    id="rateInputText"
                    type="text"
                    maxLength="200"
                    rows="5"
                    cols="25"
                    placeholder="Type your review"
                    style={ { resize: 'none' } }
                    onChange={ handleRateText }
                  />
                </label>
              </div>
              <div>
                <button
                  className="Review__rate-btn"
                  type="button"
                  disabled={ isBtnDisabled }
                  onClick={ setReviewToLocalStorage }
                >
                  Send
                </button>
              </div>
            </div>
          )
          : (
            <div>
              <h4
                className="Review__rate-comment"
              >
                Thank you for your opinion!

              </h4>
              <button
                className="Review__rate-btn"
                type="button"
                onClick={ enableEditReview }
              >
                New review
              </button>
            </div>
          )
      }
    </div>
  );
}

Review.propTypes = {
  id: PropTypes.string,
}.isRequired;
