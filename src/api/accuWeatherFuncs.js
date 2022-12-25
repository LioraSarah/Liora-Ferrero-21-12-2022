export const API_ROOT = 'https://dataservice.accuweather.com';

const API_KEY = "PXrMrDFjEQbFMD4v047JAhvv344PwTnN";

export const getAutocomplete = async (payload) => {
  const url = `${API_ROOT}/locations/v1/cities/autocomplete`;
  const query = `?apikey=${API_KEY}&q=${payload.text}`;
  const response = await fetch(url + query);
  const responseJSON = await response.json();
  return responseJSON;
};

export const getCurrentCondition = async (payload) => {

  const cityKey = payload.key;
  const url = `${API_ROOT}/currentconditions/v1/`;
  const query = `${cityKey}?apikey=${API_KEY}`;
  const response = await fetch(url + query);
  const responseJSON = await response.json();
  return responseJSON;
};

export const getFiveDays = async (payload) => {

  const cityKey = payload.key;
  const isMetric = payload.isMetric;
  const url = `${API_ROOT}/forecasts/v1/daily/5day/`;
  const query = `${cityKey}?apikey=${API_KEY}&metric=${isMetric}`;
  const response = await fetch(url + query);
  const responseJSON = await response.json();
  return responseJSON;
};
