let _ = require('lodash');

let config = require('./config'),
    feeds = {
        nhl: require('./feeds/nhl')
    };

let enabledUsers = _(config.users)
    .filter(user => user.enabled)
    .value();

_(enabledUsers)
    .forEach((user) => {
        let feedPromises = _(user.feeds)
            .filter(feed => feed.enabled)
            .map(feed => feeds[feed.name].getFeedData(feed))
            .value();

        Promise.all(feedPromises).then(values => {
            let items = _(values).flatten().value();

            console.log(items);
        });
    });