import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
  try {
    const response = await fetch('/auth/token');
    const data = await response.json();
    const { accessToken } = data;
    console.log('HERE');
    console.log('TOKEN', accessToken);
    return { token: accessToken.trim(), type: 'updater/updateToken' };
  } catch (error) {
    console.error('Token fetch error: ', error);
  }
});

export const fetchUserData = createAsyncThunk(
  'api/user',
  async (_, { dispatch }) => {
    //First get the token...
    dispatch(fetchToken());
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      const { display_name, email } = data;
      return {
        userName: display_name,
        email,
        type: 'updater/updateUserAndEmail'
      };
    } catch (error) {
      console.error('User data fetch error: ', error);
    }
  }
);

export const updateWeatherAPI = createAsyncThunk(
  '/api/weather',
  async (_, { getState }) => {
    const body = JSON.stringify({ zip: getState().updater.zipcode });
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'no-cors'
      },
      body
    });
    const newData = await response.json();
    return {
      type: 'updater/updateWeather',
      city: newData.city,
      weather: newData.type,
      temp: newData.temp
    };
  }
);
