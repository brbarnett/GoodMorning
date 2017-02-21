var _ = require('lodash'),
    http = require('http'),
    request = require('request');

var config = require('./config');

var feedPromises = [
    createFeedPromise(config.feeds.nhl)
];

function createFeedPromise(feed) {
    return new Promise((resolve, reject) => {
        if (!feed.enabled) {
            resolve(null);
            return;
        }

        request(feed.url, (error, response, json) => {
            if (error || response.statusCode != 200)
                reject(error);

            resolve(JSON.parse(json));
        })
    });
}

var users = _(config.users)
    .filter(x => x.enabled)
    .value();

var getWeather = Promise.resolve(4);

Promise.all(feedPromises).then(values => {
    var nhl = parseNhl(values[0]);
    //parseWeather(values[1]);
});

function parseNhl(data) {
    if (data === null) return;
    if (data.totalGames <= 0) return;

    var today = data.dates[0];
    if (today.length <= 0) return;

    var wingsGame = _(today.games)
        .chain()
        .find(x => x.teams.home.team.id === 17 || x.teams.away.team.id === 17)
        .value();

    if (typeof wingsGame === 'undefined') return;

    var gameTime = new Date(wingsGame.gameDate);

    console.log(`${wingsGame.teams.away.team.name} @ ${wingsGame.teams.home.team.name}, ${gameTime}`)
}

function parseWeather(data) {

}

function parseMlb(data) {

}