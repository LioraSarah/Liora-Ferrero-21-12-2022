import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectAllFavorites, removeFavorite } from '../../features/favorites/favoritesSlice';
import { formatDate } from '../../helperFunctions/helpers';
import { setIsFavorite, setCurrentCityKey, setCurrentCityName } from "../../features/currentCity/correntCitySlice";
import { clearSearchTerm } from '../../features/search/searchSlice.js';
import { selectIsMetric } from '../../features/fiveDays/fiveDaysSlice';
import './favorites.css';


export const Favorites = () => {

    const favorites = useSelector(selectAllFavorites);
    const isMetric = useSelector(selectIsMetric);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let unit = '';

    if (isMetric) {
        unit = 'Metric';
    } else {
        unit = 'Imperial';
    }

    const onClickButtonHandler = (e) => {
        const favCityKey = e.target.parentNode.id;
        dispatch(removeFavorite(favCityKey));
    }

    const onClickFavHandler = (e) => {
        //only navigate if the press on the favorite wasn't inside the remove button
        if (e.target.className !== "remove-button") {
            let key = '';
            if (e.target.className === "general-box fav-box") {
                key = e.target.id;
                dispatch(setCurrentCityKey(key));
            } else {
                key = e.target.parentNode.id;
                dispatch(setCurrentCityKey(key));
            }
            //finds the pressed city name from the h3 of the name
            const query = "#k" + key + ".fav-name";
            const name = document.querySelector(query);
            dispatch(setCurrentCityName(name.innerHTML));
            dispatch(setIsFavorite(true));
            dispatch(clearSearchTerm());
            navigate('/');
        }
    }

    return (
        <div id="favorites-container">
            <div id="white-overlay">
                <h2 id="fav-header">Your Favorites</h2>
                <div className="general-flex-container">
                    {favorites.map((favorite, i) => (
                        <div className="general-box fav-box" key={favorite.key} id={favorite.key} onClick={onClickFavHandler}>
                            <h3 className="fav-name" id={"k" + favorite.key}>{favorite.name}</h3>
                            <p>{favorite.current.Temperature[unit].Value} {favorite.current.Temperature[unit].Unit}</p>
                            <p>{formatDate(favorite.current.LocalObservationDateTime).getHours()}:
                                {formatDate(favorite.current.LocalObservationDateTime).getMinutes()}</p>
                            <button className="remove-button" onClick={onClickButtonHandler}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


}