const path = require('path');
const dotenv = require('dotenv');
const weatherController = {};
dotenv.config();

weatherController.getData = async (req, res, next) => {
  // Getting the zipcode
  const { zip } = req.body;
  // Convert to nm
  const WEATHER_URL_ZIP = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
  // fetching weather
  const weatherReq = await fetch(WEATHER_URL_ZIP);
  //
  const apiResponse = await weatherReq.json();
  console.log('apiResponsee', apiResponse);
  const responseObj = {
    type: apiResponse.weather[0].main.toLowerCase(),
    temp: apiResponse.main.temp,
    zip,
    city: apiResponse.name,
    iconUrl: `https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@2x.png`,
    bg: '' //background path
  };

  //DOES NOT WORK RIGHT NOW.
  if (responseObj.type === 'sunny') {
    responseObj.bg = path.resolve(
      __dirname,
      '../public/backgroundAssets/sunny.image'
    );
  }
  if (responseObj.type === 'rain') {
    responseObj.bg = path.resolve(
      __dirname,
      '../public/backgroundAssets/sunny.image'
    );
  }
  if (responseObj.type === 'windy') {
    responseObj.bg = path.resolve(
      __dirname,
      '../public/backgroundAssets/sunny.image'
    );
  }
  if (responseObj.type === 'snow') {
    responseObj.bg = path.resolve(
      __dirname,
      '../public/backgroundAssets/sunny.image'
    );
  }

  res.locals.response = responseObj;

  console.log('This is res.locals: ', res.locals.response);
  return next();
};

module.exports = weatherController;
