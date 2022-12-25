import React from 'react';
import { useSelector } from 'react-redux';
import { Search } from './searchBar/Search';
import { WeatherPreview } from './weatherPreview/WeatherPreview';
import { selectCurrentCondition } from '../../features/currentCity/correntCitySlice';
import { chooseClassName, isNotEmptyObj } from '../../helperFunctions/helpers';
import "./Home.css";


export const Home = () => {

  const currentCondition = useSelector(selectCurrentCondition);
  let weatherClass = '';

  //check if the current city was already rendered, then assign className values for interactive background
  if (isNotEmptyObj(currentCondition)) {
    weatherClass = chooseClassName(currentCondition.WeatherIcon);
  }

  return (
    <section id='home-container' className={weatherClass}>
      <Search />
      <WeatherPreview />
    </section>
  );
};