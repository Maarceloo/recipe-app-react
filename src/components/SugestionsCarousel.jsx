import React from 'react';
import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import SimpleCard from './SimpleCard';

const mapToCarousel = (sugestions, recipeType) => sugestions.map((recipe, i) => ({
  testid: `${i}-recomendation-card`,
  thumb: recipe[`str${recipeType}Thumb`],
  name: recipe[`str${recipeType}`],
  id: recipe[`id${recipeType}`],
}));

const SugestionCarousel = ({ sugestions = [] }) => {
  const recipeType = sugestions[0] && sugestions[0].strMeal ? 'Meal' : 'Drink';
  const data = mapToCarousel(sugestions, recipeType);

  return (
    <Carousel>
      {data.map((obj, i, originalArray) => {
        const next = (i + 1) % originalArray.length;
        return (
          <Carousel.Item key={ `CarouselItem${obj.id}` }>
            <div className="sugestion-carousel">
              <div className="card-wrapper">
                <h3 data-testid={ `${i}-recomendation-title` }>{obj.name}</h3>
                <SimpleCard { ...obj } testid={ `${i}-recomendation-card` } />
              </div>
              <div className="card-wrapper-two">
                <SimpleCard
                  { ...originalArray[next] }
                  testid={ `doubled-${i}-card` }
                />
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

SugestionCarousel.propTypes = {
  sugestions: propTypes.arrayOf(propTypes.object).isRequired,
};

export default SugestionCarousel;
