import { createSlice } from '@reduxjs/toolkit';
import { fetchToken, fetchUserData, updateWeatherAPI } from './thunks';

const initialState = {
  userName: null,
  email: null,
  weather: null,
  temp: null,
  zipcode: '10001',
  city: null,
  url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  playlist: '4ANPW38qMEYQ3Z1mVLrtmm',
  token: null,
  tokenLoadingState: 'Loading',
  tokenError: null,
  userInfoLoadingState: 'Loading',
  userInfoLoadingError: null,
  weatherLoadingState: 'Loading',
  weatherLoadingError: null,
  textColor: 'grey'
};

const stateSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    updateAll: (state, action) => {
      state.weather = action.payload.weather;
      state.temp = action.payload.temp;
      state.zipcode = action.payload.zip;
      state.city = action.payload.city;
      state.url = action.payload.url;
      state.bg = action.payload.bg;
    },
    updateUserAndEmail: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    updateWeather: (state, action) => {
      state.weather = action.payload;
      if (action.payload === 'clouds') {
        state.url = 'https://images.hdqwalls.com/wallpapers/sunny-fields.jpg';
        state.playlist = '37i9dQZF1EIfv2exTKzl3M';
      } else if (action.payload === 'clear') {
        state.url = 'https://images.hdqwalls.com/wallpapers/desert-road-aq.jpg';
        state.playlist = '6VCXXQSDMXLYaHNaWPx11S';
      } else if (action.payload === 'rain') {
        state.url =
          'https://images.hdqwalls.com/wallpapers/scifi-city-rain-5k-xa.jpg';
        state.playlist = '4ANPW38qMEYQ3Z1mVLrtmm';
      }
    },
    updateTemp: (state, action) => {
      state.temp = action.payload;
    },
    updateZipcode: (state, action) => {
      state.zipcode = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.tokenLoadingState = 'Loading';
        state.tokenError = null;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokenLoadingState = 'Succeeded';
        state.token = action.payload.token;
        state.tokenError = null;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.tokenLoadingState = 'Failed';
        state.tokenError = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.userInfoLoadingState = 'Loading';
        state.userInfoLoadingError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userInfoLoadingState = 'Succeeded';
        state.email = action.payload.email;
        state.userName = action.payload.userName;
        state.userInfoLoadingError = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userInfoLoadingState = 'Failed';
        state.userInfoLoadingError = action.error.message;
      })
      .addCase(updateWeatherAPI.pending, (state) => {
        state.weatherLoadingState = 'Loading';
        state.weatherLoadingError = null;
      })
      .addCase(updateWeatherAPI.fulfilled, (state, action) => {
        state.weatherLoadingState = 'Succeeded';
        state.city = action.payload.city;
        state.weather = action.payload.weather;
        state.temp = action.payload.temp;
        state.weatherLoadingError = null;

        if (state.weather === 'clouds') {
          state.url = 'https://images.hdqwalls.com/wallpapers/sunny-fields.jpg';
          state.playlist = '37i9dQZF1EIfv2exTKzl3M';
          state.textColor = 'grey';
        } else if (state.weather === 'clear') {
          state.url =
            'https://images.hdqwalls.com/wallpapers/desert-road-aq.jpg';
          state.playlist = '6VCXXQSDMXLYaHNaWPx11S';
          state.textColor = 'grey';
        } else if (state.weather === 'rain') {
          state.url =
            'https://images.hdqwalls.com/wallpapers/scifi-city-rain-5k-xa.jpg';
          state.playlist = '4ANPW38qMEYQ3Z1mVLrtmm';
          state.textColor = 'white';
        } else if (state.weather === 'mist') {
          state.url =
            'https://images.hdqwalls.com/wallpapers/marin-county-mist-morning-4k-5q.jpg';
          state.playlist = '7x5aH9KMGYORlCF5lguQ9q';
          state.textColor = 'grey';
        }
      })
      .addCase(updateWeatherAPI.rejected, (state, action) => {
        state.weatherLoadingState = 'Failed';
        state.weatherLoadingError = action.error.message;
      });
  }
});

//THUNKS

export const {
  updateWeather,
  updateTemp,
  updateZipcode,
  updateCity,
  updateUrl,
  updateAll,
  updatePlaylist,
  updateToken,
  updateUserAndEmail
} = stateSlice.actions;
export default stateSlice.reducer;
