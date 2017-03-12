let _ = require('lodash'),
    dataService = require('../services/dataService');

let games = [];

let parseGames = data => {
    if (data === null) return;
    if (data.totalGames <= 0) return;

    var today = data.dates[0];
    if (today.length <= 0) return;

    games = today.games;
}

let getFeedData = feed => {
    //if(games.length > 0) return parse(games, options);

    return new Promise((resolve, reject) => {
        if (games.length > 0) resolve(getContent(feed));

        dataService
            .createFeedPromise(feed)
            .then(data => {
                parseGames(data);
                resolve(getContent(feed))
            });
    });

    // dataService
    //     .createFeedPromise(feed)
    //     .then(data => {
    //         parseGames(data);

    //     });
}

let getContent = options => {
    var userGames = _(games)
        .chain()
        .filter(x => options.teams.includes(x.teams.home.team.id) || options.teams.includes(x.teams.away.team.id))
        .value();

    if (typeof userGames === 'undefined' || userGames.length <= 0) return [];

    return _(userGames)
        .map(game => {
            let gameTime = new Date(game.gameDate);

            return `${game.teams.away.team.name} @ ${game.teams.home.team.name}, ${gameTime}`;
        })
        .value();
}

module.exports = {
    getFeedData: getFeedData
}