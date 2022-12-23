import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import { Favorites } from './components/favorites/Favorites';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearAutocomplete, selectAutocompleteList } from './features/search/searchSlice.js';
import { loadCurrentCondition, selectCurrentCityKey, selectIsMetric } from './features/currentCity/correntCitySlice';
import { loadFiveDays } from './features/fiveDays/fiveDaysSlice';
import { useLocation } from 'react-router-dom';

  


function App() {

  const dispatch = useDispatch();
  const autocompleteList = useSelector(selectAutocompleteList);
  let location = useLocation();
  const cityKey = useSelector(selectCurrentCityKey);
  const isMetric = useSelector(selectIsMetric);

  React.useEffect(() => {
    console.log(cityKey);
    if (location.pathname === '/') {
      dispatch(loadCurrentCondition({ key: cityKey }));
      dispatch(loadFiveDays({ key: cityKey, isMetric: isMetric }));
    }
  }, [dispatch, location, cityKey, isMetric]);

  const onClickHandler = (e) => {
    if (autocompleteList.length > 0 && e.target.id !== 'autocomplete-container' && e.target.parentNode.id !== 'autocomplete-container') {
        dispatch(clearAutocomplete());
    }
  }
  return (
    <div onClick={onClickHandler} id="app">

        <Header />
        <Routes>
                  <Route path="/*" element={<Home/>} />
                  <Route path="/favorites" element={<Favorites/>} />
        </Routes>

    </div>
  );
}

export default App;
