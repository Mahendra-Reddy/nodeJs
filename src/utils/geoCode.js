const request = require("request");

const geoCode = (address, callback) => {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFoZW5kcmFyZWRkeSIsImEiOiJjazk0eWJ1dGYwOWEyM2ZzbDh3OWhvenFzIn0.z15Qy548JARVHOg1gucdYQ`,
      json: true,
    },
    (error, response) => {
      if (error) {
        console.log("unable to connect weather service");
      } else if (response.body.error) {
        console.log("something went wrong");
      } else {
        callback(null, {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geoCode;
