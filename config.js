module.exports = {
    feeds: {
        nhl: {
            enabled: false,
            url: 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-03-12&endDate=2017-03-13'
        },
        weather: {
            enabled: true,
            url: 'https://api.wunderground.com/api/7a30ee5361a106cd/forecast/q/60657.json'
        }
    },
    users: [
        {
            enabled: true,
            mobile: '+18475089028',
            name: 'Brandon R Barnett',
            feeds: [
                {
                    enabled: true,
                    name: 'nhl',
                    teams: [ 17, 30 ]   // Red Wings
                },
                {
                    enabled: true,
                    name: 'weather',
                    zipCodes: [ 60657 ] // Wrigleyville
                }
            ]
        },
        {
            enabled: true,
            mobile: '+17347304495',
            name: 'Anna Barnett',
            feeds: [
                {
                    enabled: true,
                    name: 'nhl',
                    teams: [ 30 ]   // Wild
                }
            ]
        }
    ]
}