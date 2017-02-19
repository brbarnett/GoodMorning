var _ = require('lodash'),
    http = require('http'),
    request = require('request');

var nhlSchedule = new Promise((resolve, reject) => {
    request('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-02-19&endDate=2017-02-19', (error, response, json) => {
        if (error || response.statusCode != 200)
            reject(error);

        resolve(JSON.parse(json));
    })
});


var weather = Promise.resolve(4);

Promise.all([nhlSchedule, weather]).then(values => {
    parseNhl(values[0]);
    parseWeather(values[1]);
});

function parseNhl(data) {
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