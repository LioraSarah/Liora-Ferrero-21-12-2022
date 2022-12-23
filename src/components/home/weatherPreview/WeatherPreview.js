import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMetric, selectIsFavorite, setIsFavorite, selectCurrentCityName, selectCurrentCityKey, selectCurrentCondition, isLoadingCurrentCity, loadCurrentCondition } from '../../../features/currentCity/correntCitySlice';
import { formatDate, searchFavorite } from '../../../helperFunctions/helpers';
import { FiveDays } from './fiveDays/FiveDays';
import { addFavorite, selectAllFavorites, removeFavorite } from '../../../features/favorites/favoritesSlice';
import { FiHeart } from 'react-icons/fi';
import "./weatherPreview.css";

export const WeatherPreview = () => {

    const cityKey = useSelector(selectCurrentCityKey);
    const cityName = useSelector(selectCurrentCityName);
    const currentCondition = useSelector(selectCurrentCondition);
    const isFavorite = useSelector(selectIsFavorite);
    const isLoadingCurrentCondition = useSelector(isLoadingCurrentCity);
    const favoritesList = useSelector(selectAllFavorites);
    const isMetric = useSelector(selectIsMetric);
    const dispatch = useDispatch();
    let addFavoriteElment;

    useEffect(() => {
        if (cityKey) {
            dispatch(loadCurrentCondition({ key: cityKey }));
        }
    }, [dispatch, cityKey]);

    if (isLoadingCurrentCondition) {
        return (<div id="loading-container">
            <p id="loading">loading current condition...</p>
        </div>);
    }

    const onClickHandler = () => {
        const isFavorite = searchFavorite(cityKey, favoritesList);
        if (isFavorite < 0) {
            const favoriteObj = {
                key: cityKey,
                name: cityName,
                current: currentCondition
            }
            dispatch(addFavorite(favoriteObj));
            dispatch(setIsFavorite(true));
        } else {
            dispatch(removeFavorite(cityKey));
            dispatch(setIsFavorite(false));
        }
    }

    let formattedDate;
    let currentHour, currentMinutes, weatherText, temperature, unit = '';

    //check if the current city was already rendered, then assign values
    if (!(Object.keys(currentCondition).length === 0 && currentCondition.constructor === Object)) {
        weatherText = currentCondition.WeatherText;
        if (isMetric) {
            temperature = currentCondition.Temperature.Metric.Value;
            unit = currentCondition.Temperature.Metric.Unit;
        } else {
            temperature = currentCondition.Temperature.Imperial.Value;
            unit = currentCondition.Temperature.Imperial.Unit;
        }
        formattedDate = formatDate(currentCondition.LocalObservationDateTime);
        currentHour = formattedDate.getHours();
        currentMinutes = formattedDate.getMinutes();
    }

    if (isFavorite) {
        addFavoriteElment = <div><FiHeart className="redHeart" onClick={onClickHandler} /></div>; //<div id="favorite-button" onClick={onClickHandler}>it is favorite</div>;
    } else {
        addFavoriteElment = <div><FiHeart className="heart" onClick={onClickHandler} /></div>; //<div id="favorite-button" onClick={onClickHandler}>add to favorites</div>;
    }

    return (
        <div id="general-weather-container">
            <div className='general-weather-preview'>
                <div id="current-condition">
                    {addFavoriteElment}
                    <h2 id="city-name" className='header-general'>{cityName}</h2>
                    <p id="weather-text">{weatherText}</p>
                    <p>Current temperature is : {temperature} {unit}</p>
                    <p>Current time is : {currentHour + ":" + currentMinutes}</p>
                </div>
                <div id="five-days">
                    <FiveDays />
                </div>
            </div>
        </div>
    );


}