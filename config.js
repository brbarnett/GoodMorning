module.exports = {
    feeds: {
        nhl: {
            enabled: true,
            url: 'https://statsapi.web.nhl.com/api/v1/schedule?startDate={0}&endDate={1}'    // yyyy-mm-dd
        },
        weather: {
            enabled: true,
            url: 'https://api.wunderground.com/api/7a30ee5361a106cd/forecast/q/{0}.json'
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
                    teams: [ 17 ]   // 17 = Red Wings
                },
                {
                    enabled: true,
                    name: 'weather',
                    zipCodes: [ 60657 ]
                }
            ]
        },
        {
            enabled: false,
            mobile: '+17347304495',
            name: 'Anna Barnett',
            feeds: [
                {
                    enabled: true,
                    name: 'weather',
                    zipCodes: [ 60657 ]
                }
            ]
        }
    ]
}