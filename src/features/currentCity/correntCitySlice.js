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

export const currentCitySlice = createSlice({
    name: 'currentCity',
    initialState: {
      currentCityName: defaultCity,
      currentCityKey: defaultCityKey,
      cityCondition: {},
      isLoadingCurrentCondition: false,
      hasError: false,
      errorMessage: '',
      isFavorite: false,
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
          .addCase(loadCurrentCondition.rejected, (state, {error}) => {
            state.isLoadingCurrentCondition = false;
            state.hasError = true;
            state.errorMessage = error.message;
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
export const selectHasError = (state) => state.currentCity.hasError;
//actions
export const {setCurrentCityKey, setCurrentCityName, clearCurrentCityName, setIsFavorite} = currentCitySlice.actions;
//reducer
export default currentCitySlice.reducer;