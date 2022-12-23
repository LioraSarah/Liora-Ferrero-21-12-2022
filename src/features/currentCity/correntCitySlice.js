import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentCondition } from '../../api/accuWeatherFuncs';

export const loadCurrentCondition = createAsyncThunk(
  'currentCity/loadCurrentCondition',
  async (payload) => {
    if (payload) {
        const CurrentCondition = await getCurrentCondition(payload);
        return CurrentCondition[0];
    }
  }
);

const defaultCity = 'Tel Aviv';
const defaultCityKey = '215854';
// const defaultCityCondition = {
//   "LocalObservationDateTime": "2022-12-21T08:13:00+02:00",
//   "EpochTime": 1671603180,
//   "WeatherText": "Partly sunny",
//   "WeatherIcon": 3,
//   "HasPrecipitation": false,
//   "PrecipitationType": null,
//   "IsDayTime": true,
//   "Temperature": {
//     "Metric": {
//       "Value": 15,
//       "Unit": "C",
//       "UnitType": 17
//     },
//     "Imperial": {
//       "Value": 59,
//       "Unit": "F",
//       "UnitType": 18
//     }
//   },
//   "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
//   "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
// };

export const currentCitySlice = createSlice({
    name: 'currentCity',
    initialState: {
      currentCityName: defaultCity,
      currentCityKey: defaultCityKey,
      cityCondition: {},
      isLoadingCurrentCondition: false,
      hasError: false,
      isFavorite: false,
      isMetric: true
    },
    reducers: {
        setCurrentCityKey(state, action) {
            state.currentCityKey = action.payload
        },
        setCurrentCityName(state, action) {
            state.currentCityName = action.payload
        },
        setIsFavorite(state, action) {
          state.isFavorite = action.payload;
        },
        setIsMetric(state, action) {
          state.isMetric = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadCurrentCondition.pending, (state) => {
            state.isLoadingCurrentCondition = true;
            state.hasError = false;
          })
          .addCase(loadCurrentCondition.fulfilled, (state, action) => {
            state.isLoadingCurrentCondition = false;
            state.cityCondition = action.payload;
          })
          .addCase(loadCurrentCondition.rejected, (state) => {
            state.isLoadingCurrentCondition = false;
            state.hasError = true;
            state.cityCondition = {};
          })
      }
});


//selectors
export const selectCurrentCityKey = (state) => state.currentCity.currentCityKey;
export const selectCurrentCityName = (state) => state.currentCity.currentCityName;
export const isLoadingCurrentCity = (state) => state.currentCity.isLoadingCurrentCondition;
export const selectIsFavorite = (state) => state.currentCity.isFavorite;
export const selectCurrentCondition = (state) => state.currentCity.cityCondition;
export const selectIsMetric = (state) => state.currentCity.isMetric;
//actions
export const {setCurrentCityKey, setCurrentCityName, clearCurrentCityName, setIsFavorite, setIsMetric} = currentCitySlice.actions;
//reducer
export default currentCitySlice.reducer;