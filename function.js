var _ = require('lodash'),
    http = require('http'),
    request = require('request');

var config = require('./config');

var getNhl = new Promise((resolve, reject) => {
    if (!config.feeds.nhl.enabled) {
        resolve(null);
        return;
    }

    request(config.feeds.nhl.url, (error, response, json) => {
        if (error || response.statusCode != 200)
            reject(error);

        resolve(JSON.parse(json));
    })
});

var getWeather = Promise.resolve(4);

Promise.all([getNhl, getWeather]).then(values => {
    parseNhl(values[0]);
    parseWeather(values[1]);
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