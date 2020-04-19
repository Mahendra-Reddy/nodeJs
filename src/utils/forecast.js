const request = require("request");

const forecast = (longitude, latitude, callback) => {
  request(
    {
      url: `http://api.weatherstack.com/current?access_key=4e235485af001820c87dfa64e419816c&query=${latitude},${longitude}`,
      json: true,
    },
    (error, response) => {
      if (error) {
        console.log("unable to connect forecast service");
      } else if (response.body.error) {
        console.log("something went wrong");
      } else {
        console.log(response.body)
        callback(null, {
          temperature: response.body.current.temperature,
          precip: response.body.current.precip,
          time: response.body.location.localtime
        });
      }
    }
  );
};

module.exports = forecast;
