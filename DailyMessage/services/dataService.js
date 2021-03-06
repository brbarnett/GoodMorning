let request = require('request'),
    config = require('../config');

let createFeedPromise = (feed, url) => {
    let feedConfig = config.feeds[feed.name];

    return new Promise((resolve, reject) => {
        if (!feedConfig.enabled) {
            resolve(null);
            return;
        }

        request(url, (error, response, json) => {
            if (error || response.statusCode != 200)
                reject(error);

            resolve(JSON.parse(json));
        })
    });
}

module.exports = {
    createFeedPromise: createFeedPromise
}