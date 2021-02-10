const request = require("request");

const geocode = (location, callback) => {
  if (!location) {
    callback("Please provide a location!", undefined);
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibWFuaXNoLW1hcGJveCIsImEiOiJja2t3ZjdsM2oxY2tjMndtc3M0bGZkbGYzIn0.YCoGf9hMBebc4jdhslH6nw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid location. Please provide a valid location.", undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const placeName = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        placeName,
      });
    }
  });
};

module.exports = geocode;
