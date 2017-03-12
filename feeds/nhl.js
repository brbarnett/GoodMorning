let _ = require('lodash'),
    dataService = require('../services/dataService');

module.exports = {
    getFeedData: getFeedData
}

function getContent(games, options) {  
    let userGames = _(games)
        .chain()
        .filter(x =>
            options.teams.includes(x.teams.home.team.id) ||
            options.teams.includes(x.teams.away.team.id))
        .value();

    if (typeof userGames === 'undefined' ||
        userGames.length <= 0)
        return [];

    return _(userGames)
        .map(game => {
            let gameTime = new Date(game.gameDate);
            return `${game.teams.away.team.name} @ ${game.teams.home.team.name}, ${gameTime}`;
        })
        .value();
}

function getFeedData(feed) {
    return new Promise((resolve, reject) => {
        dataService
            .createFeedPromise(feed)
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