import { configureStore, combineReducers } from '@reduxjs/toolkit'; 
import searchReducer from '../features/search/searchSlice.js';
import currentCityReducer from '../features/currentCity/correntCitySlice';
import fiveDaysReducer from '../features/fiveDays/fiveDaysSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';


export default configureStore({
  reducer: combineReducers({
    search: searchReducer,
    currentCity: currentCityReducer,
    fiveDays: fiveDaysReducer,
    favorites: favoritesReducer
  })
});