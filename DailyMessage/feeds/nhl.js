let _ = require('lodash'),
    config = require('../config'),
    dataService = require('../services/dataService'),
    moment = require('moment');

module.exports = {
    getFeedData: getFeedData
}

function getContent(games, options) {
    let userGames = _(games)
        .filter(x =>
            options.teams.includes(x.teams.home.team.id) ||
            options.teams.includes(x.teams.away.team.id))
        .value();

    if (typeof userGames === 'undefined' ||
        userGames.length <= 0)
        return [];

    return _(userGames)
        .map(game => {
            let gameTime = moment(game.gameDate).tz('America/Chicago').format('hh:mma z');
            return `NHL: ${game.teams.away.team.name} @ ${game.teams.home.team.name}, ${gameTime}`;
        })
        .value();
}

function getFeedData(feed) {
    let today = moment();
    let feedUrl = config.feeds.nhl.url.format(today.format('YYYY-MM-DD'), today.add(1, 'days').format('YYYY-MM-DD'));
    return new Promise((resolve, reject) => {
        dataService
            .createFeedPromise(feed, feedUrl)
            .then(data => {
                let games = parseGames(data);
                resolve(getContent(games, feed));
            })
            .catch(err => {
                reject(err);
            });
    });
}

function parseGames(data) {
    if (data === null) return;
    if (data.totalGames <= 0) return;

    let today = data.dates[0];
    if (today.length <= 0) return;

    return today.games;
}