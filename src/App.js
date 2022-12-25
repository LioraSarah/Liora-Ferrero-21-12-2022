import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import { Favorites } from './components/favorites/Favorites';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearAutocomplete, selectAutocompleteList } from './features/search/searchSlice.js';
import { loadCurrentCondition, selectCurrentCityKey } from './features/currentCity/correntCitySlice';
import { loadFiveDays, selectIsMetric } from './features/fiveDays/fiveDaysSlice';
import { useLocation } from 'react-router-dom';
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/react-toastify.css';


function App() {

  const dispatch = useDispatch();
  const autocompleteList = useSelector(selectAutocompleteList);
  let location = useLocation();
  const cityKey = useSelector(selectCurrentCityKey);
  const isMetric = useSelector(selectIsMetric);

  React.useEffect(() => {
    //load currentCondition everytime we route to home
    if (location.pathname === '/') {
      dispatch(loadCurrentCondition({ key: cityKey }));
      dispatch(loadFiveDays({ key: cityKey, isMetric: isMetric }));
    }
  }, [dispatch, location, cityKey, isMetric]);

  const onClickHandler = (e) => {
    //make autocomplete disappear when clicking on any place in the app except autocomplete itself
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
