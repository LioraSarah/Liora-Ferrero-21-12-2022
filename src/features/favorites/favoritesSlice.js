import { createSlice } from '@reduxjs/toolkit';
import {searchFavorite } from '../../helperFunctions/helpers';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
      allFavorites: [],
    },
    reducers: {
        addFavorite(state, action) {
            const cityInfo = {
                key: action.payload.key,
                name: action.payload.name,
                current: action.payload.current
            };
            state.allFavorites.push(cityInfo);
        },
        removeFavorite(state, action) {
            const cityKey = action.payload;
            const cityToRemove = searchFavorite(cityKey, state.allFavorites);
            if (cityToRemove !== -1) {
                state.allFavorites.splice(cityToRemove, 1);
            }
        }
    }
});


//selectors
export const selectAllFavorites = (state) => state.favorites.allFavorites;
export const selectFavoriteCity = (state, cityKey) => state.search.allFavorites[cityKey];
//actions
export const {addFavorite, removeFavorite} = favoritesSlice.actions;
//reducer
export default favoritesSlice.reducer;