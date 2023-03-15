import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  email: 'test@test.com',
  type: null,
  temp: null,
  zipcode: '10001',
  city: null,
  url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  playlist: '4ANPW38qMEYQ3Z1mVLrtmm',
  token: null
};

const stateSlice = createSlice({
  name: 'updater',
  initialState,
  reducers: {
    updateAll: (state, action) => {
      state.type = action.payload.type;
      state.temp = action.payload.temp;
      state.zipcode = action.payload.zip;
      state.city = action.payload.city;
      state.url = action.payload.url;
      state.bg = action.payload.bg;
    },
    updateUser: (state, action) => {
      state.userName = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
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
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const {
  updateType,
  updateTemp,
  updateZipcode,
  updateCity,
  updateUrl,
  updateAll,
  updateUser,
  updatePlaylist,
  updateEmail,
  updateToken
} = stateSlice.actions;
export default stateSlice.reducer;
