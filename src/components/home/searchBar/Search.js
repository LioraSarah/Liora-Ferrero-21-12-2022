import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { clearAutocomplete, setSearchTerm, clearSearchTerm, selectSearchTerm, loadAutocomplete, isLoading, selectAutocompleteList } from '../../../features/search/searchSlice.js';
import "./Search.css"
import clearIconUrl from "../../../media/close.png";
import { setCurrentCityName, setCurrentCityKey, setIsFavorite } from '../../../features/currentCity/correntCitySlice';
import { searchFavorite } from '../../../helperFunctions/helpers';
import { selectAllFavorites } from '../../../features/favorites/favoritesSlice';

export const Search = () => {

    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();
    const autocompletePreview = useSelector(selectAutocompleteList);
    const isLoadingAutocomplete = useSelector(isLoading);
    const favoritesList = useSelector(selectAllFavorites);
    let autocompleteDiv = <></>;

    useEffect(() => {
        dispatch(loadAutocomplete({ text: searchTerm }));
    }, [dispatch, searchTerm]);


    const debounceSearchChangeHandler = debounce((e) => {
        const userInput = e.target.value;
        const english = /^[A-Za-z0-9]*$/;
        //only execute the action if english letters and numbers has been typed
        if (english.test(userInput)) {
            dispatch(setSearchTerm(userInput));
        }
    }, 200);

    const onClearSearchTermHandler = () => {
        dispatch(clearSearchTerm());
    };

    const onClickHandler = (e) => {
        // console.log(e);
        const clickedCityKey = e.target.id;
        const clickedCityName = e.target.innerHTML.split(',')[0];
        const isFavorite = searchFavorite(clickedCityKey, favoritesList);
        dispatch(setCurrentCityKey(clickedCityKey));
        dispatch(setCurrentCityName(clickedCityName));
        dispatch(clearAutocomplete());
        //update the state according to if it's saved in favorite
        if (isFavorite >= 0) {
            dispatch(setIsFavorite(true));
        } else {
            dispatch(setIsFavorite(false));
        }
    }

    //show Autocomplete only if the search-bar isn't empty and the data is fetched
    if (isLoadingAutocomplete) {
        autocompleteDiv = <div id="autocomplete-container" className="search-box-general">
            <p id="loading">loading...</p>
        </div>;
    } else if (autocompletePreview && autocompletePreview.length > 0) {
        autocompleteDiv = <ul id="autocomplete-container" className="search-box-general">
                {autocompletePreview.map((city) => (
                    <li key={city.Key} id={city.Key} onClick={onClickHandler} >
                        {city.LocalizedName} , {city.Country.LocalizedName}
                    </li>
                ))}
            </ul>
    }

    return (
        <div id="search">
            
            <div id="search-container">
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={debounceSearchChangeHandler}
                    className="search-box-general"
                    placeholder="Search a city..."
                    autoComplete="off"
                />
                {searchTerm.length > 0 && (
                    <button
                        onClick={onClearSearchTermHandler}
                        type="button"
                        id="search-clear-button"
                    >
                        <img src={clearIconUrl} alt="X" id='search-clear-icon' />
                    </button>
                )}
            </div>

            {autocompleteDiv}
            
        </div>
    );

}