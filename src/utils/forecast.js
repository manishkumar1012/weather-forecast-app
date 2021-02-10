const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c84cb1d1ffdca2a5e9eaba412de6051d&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (body.error) {
      callback("Unable to find location specified!", undefined);
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];
      const responseMessage = `${weatherDescription}. It is currently ${temperature} degrees out there.`;
      callback(undefined, responseMessage);
    }
  });
};

module.exports = forecast;
