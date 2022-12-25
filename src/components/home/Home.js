import React from 'react';
import { useSelector } from 'react-redux';
import "./Home.css";
import { Search } from './searchBar/Search';
import { WeatherPreview } from './weatherPreview/WeatherPreview';
import { chooseClassName } from '../../helperFunctions/helpers';
import { selectCurrentCondition } from '../../features/currentCity/correntCitySlice';

export const Home = () => {

  const currentCondition = useSelector(selectCurrentCondition);
  let weatherClass = '';

  //check if the current city was already rendered, then assign className values for interactive background
  if (!(Object.keys(currentCondition).length === 0 && currentCondition.constructor === Object)) {
    weatherClass = chooseClassName(currentCondition.WeatherIcon);
  }

  return (
    <section id='home-container' className={weatherClass}>
      <Search />
      <WeatherPreview />
    </section>
  );
};