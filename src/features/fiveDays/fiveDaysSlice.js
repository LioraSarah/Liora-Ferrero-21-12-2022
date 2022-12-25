import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFiveDays } from '../../api/accuWeatherFuncs';

export const loadFiveDays = createAsyncThunk(
  'fiveDays/loadFiveDays',
  async (payload) => {
    if (payload) {
        const fiveDays = await getFiveDays(payload);
        return fiveDays;
    }
  }
);

export const fiveDaysSlice = createSlice({
    name: 'fiveDays',
    initialState: {
      fiveDaysForecast: {},
      isLoadingFiveDays: false,
      hasError: false,
      isMetric: true
    },
    reducers: {
      setIsMetric(state, action) {
        state.isMetric = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadFiveDays.pending, (state) => {
            state.isLoadingFiveDays = true;
            state.hasError = false;
          })
          .addCase(loadFiveDays.fulfilled, (state, action) => {
            state.isLoadingFiveDays = false;
            state.fiveDaysForecast = action.payload;
          })
          .addCase(loadFiveDays.rejected, (state) => {
            state.isLoadingFiveDays = false;
            state.hasError = true;
            state.fiveDaysForecast = {};
          })
      }
});


//selectors
export const isLoadingFiveDays = (state) => state.fiveDays.isLoadingCurrentCondition;
export const selectFiveDays = (state) => state.fiveDays.fiveDaysForecast;
export const selectIsMetric = (state) => state.fiveDays.isMetric;
export const selectHasError = (state) => state.fiveDays.hasError;
//actions
export const { setIsMetric} = fiveDaysSlice.actions;
//reducer
export default fiveDaysSlice.reducer;