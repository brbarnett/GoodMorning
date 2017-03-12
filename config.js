module.exports = {
    feeds: {
        nhl: {
            enabled: true,
            url: 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-03-12&endDate=2017-03-13'
        },
        weather: {
            enabled: false,
            url: ''
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
                    teams: [ 17 ]   // Red Wings
                },
                {
                    enabled: false,
                    name: 'weather',
                    zipCodes: [ 60657 ] // Wrigleyville
                }
            ]
        },
        {
            enabled: false,
            mobile: '+17347304495',
            name: 'Anna Barnett'
        }
    ]
}