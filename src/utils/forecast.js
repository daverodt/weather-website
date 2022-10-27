const request = require("request");

const forecast = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1ad164b60dc3e890c700e69f9f749472&query=${latitude},${longitude}&units=f`
    request({ url, json: true}, (error, { body })=> {
        const current = body.current
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.current.length === 0) {
            callback("unable to find location. Try another search", undefined);
        } else {
            callback(undefined, {
              temperature: current.temperature,
              feelslike: current.feelslike,
              forecastData: `${current.weather_descriptions}, It is currently ${current.temperature} Farenheit degrees out but it feels like ${current.feelslike}. There is a ${current.precip}% change of rain.`
            });
        }
    })
};
    
module.exports = forecast;