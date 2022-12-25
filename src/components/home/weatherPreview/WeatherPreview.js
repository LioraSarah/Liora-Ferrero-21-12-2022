import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiHeart } from 'react-icons/fi';
import { FiveDays } from './fiveDays/FiveDays';
import { selectHasError, selectIsFavorite, setIsFavorite, selectCurrentCityName, selectCurrentCityKey, selectCurrentCondition, isLoadingCurrentCity, loadCurrentCondition } from '../../../features/currentCity/correntCitySlice';
import { selectIsMetric } from '../../../features/fiveDays/fiveDaysSlice';
import { addFavorite, selectAllFavorites, removeFavorite } from '../../../features/favorites/favoritesSlice';
import { formatDate, searchFavorite, getUnit, isNotEmptyObj } from '../../../helperFunctions/helpers';
import "./weatherPreview.css";

export const WeatherPreview = () => {

    const cityKey = useSelector(selectCurrentCityKey);
    const cityName = useSelector(selectCurrentCityName);
    const currentCondition = useSelector(selectCurrentCondition);
    const isFavorite = useSelector(selectIsFavorite);
    const isLoadingCurrentCondition = useSelector(isLoadingCurrentCity);
    const favoritesList = useSelector(selectAllFavorites);
    const isMetric = useSelector(selectIsMetric);
    const hasError = useSelector(selectHasError);
    const dispatch = useDispatch();
    let addFavoriteElment;

    useEffect(() => {
        if (cityKey) {
            dispatch(loadCurrentCondition({ key: cityKey }));
        }
    }, [dispatch, cityKey]);

    if (isLoadingCurrentCondition) {
        return (<div id="loading-container">
            <p className="loading">loading current condition...</p>
        </div>);
    };

    if(hasError) {
        return (
            <div className="error-container">
            <h4 className="error">Sorry, there was an error fetching the data :(</h4>
        </div>)
    };

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

    //check if the current city was already rendered, then assign temperature and hour values
    if (isNotEmptyObj(currentCondition)) {
        weatherText = currentCondition.WeatherText;
        const unitObj = getUnit(currentCondition, isMetric);
        temperature = unitObj.temperature;
        unit = unitObj.unit;
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
                    <p>Current temperature is : {temperature}<span className="unit-style">{unit}</span></p>
                    <p>Current time is : {currentHour + ":" + currentMinutes}</p>
                </div>
                <div id="five-days">
                    <FiveDays />
                </div>
            </div>
        </div>
    );


}