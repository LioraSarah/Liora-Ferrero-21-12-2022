import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAutocomplete } from '../../api/accuWeatherFuncs';

export const loadAutocomplete = createAsyncThunk(
  'search/loadAutocomplete',
  async (payload) => {
    let autocomplete = [];
    if (payload.text){
      autocomplete = await getAutocomplete(payload);
    }
    return autocomplete;
  }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      searchTerm: '',
      autocompleteList: [],
      isLoadingAutocomplete: false,
      hasError: false
    },
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
        clearSearchTerm(state) {
            state.searchTerm = '';
        },
        clearAutocomplete(state) {
          state.autocompleteList = [];
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadAutocomplete.pending, (state) => {
            state.isLoadingAutocomplete = true;
            state.hasError = false;
          })
          .addCase(loadAutocomplete.fulfilled, (state, action) => {
            state.isLoadingAutocomplete = false;
            state.autocompleteList = action.payload;
          })
          .addCase(loadAutocomplete.rejected, (state) => {
            state.isLoadingAutocomplete = false;
            state.hasError = true;
            state.subreddits = [];
          })
      }
});


//selectors
export const selectSearchTerm = (state) => state.search.searchTerm;
export const isLoading = (state) => state.search.isLoadingAutocomplete;
export const selectAutocompleteList = (state) => state.search.autocompleteList;
//actions
export const {setSearchTerm, clearSearchTerm, clearAutocomplete} = searchSlice.actions;
//reducer
export default searchSlice.reducer;