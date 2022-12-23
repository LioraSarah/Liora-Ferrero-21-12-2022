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

const defaultFiveDays = {
    "Headline": {
      "EffectiveDate": "2022-12-21T07:00:00+02:00",
      "EffectiveEpochDate": 1671598800,
      "Severity": 5,
      "Text": "Expect showers Wednesday",
      "Category": "rain",
      "EndDate": "2022-12-21T19:00:00+02:00",
      "EndEpochDate": 1671642000,
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2022-12-21T07:00:00+02:00",
        "EpochDate": 1671598800,
        "Temperature": {
          "Minimum": {
            "Value": 54,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 39,
          "IconPhrase": "Partly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
      },
      {
        "Date": "2022-12-22T07:00:00+02:00",
        "EpochDate": 1671685200,
        "Temperature": {
          "Minimum": {
            "Value": 54,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 67,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 36,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
      },
      {
        "Date": "2022-12-23T07:00:00+02:00",
        "EpochDate": 1671771600,
        "Temperature": {
          "Minimum": {
            "Value": 56,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 67,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 3,
          "IconPhrase": "Partly sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
      },
      {
        "Date": "2022-12-24T07:00:00+02:00",
        "EpochDate": 1671858000,
        "Temperature": {
          "Minimum": {
            "Value": 56,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 3,
          "IconPhrase": "Partly sunny",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
      },
      {
        "Date": "2022-12-25T07:00:00+02:00",
        "EpochDate": 1671944400,
        "Temperature": {
          "Minimum": {
            "Value": 57,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 67,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 14,
          "IconPhrase": "Partly sunny w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Night": {
          "Icon": 36,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
      }
    ]
  };

export const fiveDaysSlice = createSlice({
    name: 'fiveDays',
    initialState: {
      fiveDaysForecast: defaultFiveDays,
      isLoadingFiveDays: false,
      hasError: false
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
//reducer
export default fiveDaysSlice.reducer;