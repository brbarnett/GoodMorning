let _ = require('lodash'),
    dataService = require('../services/dataService');

module.exports = {
    getFeedData: getFeedData
}

function getContent(weather, options) {
    return weather.fcttext;
}

function getFeedData(feed) {
    return new Promise((resolve, reject) => {
        dataService
            .createFeedPromise(feed)
            .then(data => {
                let forecast = parseWeather(data);
                resolve(getContent(forecast, feed));
            })
            .catch(err => {
                reject(err);
            });
    });
}

function parseWeather(data) {
    if (data === null) return;

    let forecast = data.forecast.txt_forecast.forecastday[0];

    return forecast;
}