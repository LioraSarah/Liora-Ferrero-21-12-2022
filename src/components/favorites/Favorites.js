import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectAllFavorites, removeFavorite } from '../../features/favorites/favoritesSlice';
import { formatDate } from '../../helperFunctions/helpers';
import { selectCurrentCityKey, setIsFavorite, setCurrentCityKey, setCurrentCityName } from "../../features/currentCity/correntCitySlice";
import { clearSearchTerm } from '../../features/search/searchSlice.js';
import { selectIsMetric } from '../../features/fiveDays/fiveDaysSlice';
import './favorites.css';


export const Favorites = () => {

    const favorites = useSelector(selectAllFavorites);
    const currentCityKey = useSelector(selectCurrentCityKey);
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
        if (favCityKey === currentCityKey) {
            dispatch(setIsFavorite(false));
        }
    }

    const onClickFavHandler = (e) => {
        if (e.target.className !== "remove-button") {
            let key = '';
            if (e.target.className === "general-box fav-box") {
                key = e.target.id;
                dispatch(setCurrentCityKey(key));
            } else {
                key = e.target.parentNode.id
                console.log(e.target.parentNode.id);
                dispatch(setCurrentCityKey(key));
            }
            const query = "#k" + key + ".fav-name";
            const name = document.querySelector(query);
            console.log(name.innerHTML);
            dispatch(setCurrentCityName(name.innerHTML));
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
                        <div className="general-box fav-box" key={i} id={favorite.key} onClick={onClickFavHandler}>
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