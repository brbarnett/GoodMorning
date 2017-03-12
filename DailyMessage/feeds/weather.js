let _ = require('lodash'),
    config = require('../config'),
    dataService = require('../services/dataService');

module.exports = {
    getFeedData: getFeedData
}

function getContent(weather, options, zipCode) {
    return `Weather for ${zipCode}: ${weather.fcttext}`;
}

function getFeedData(feed) {
    let promises = _(feed.zipCodes)
        .map(zipCode => {
            let feedUrl = config.feeds.weather.url.format(zipCode);
            return new Promise((resolve, reject) => {
                dataService
                    .createFeedPromise(feed, feedUrl)
                    .then(data => {
                        let forecast = parseWeather(data);
                        resolve(getContent(forecast, feed, zipCode));
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        })
        .value();

        return promises;
}

function parseWeather(data) {
    if (data === null) return;

    let forecast = data.forecast.txt_forecast.forecastday[0];

    return forecast;
}