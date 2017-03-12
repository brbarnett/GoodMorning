let _ = require('lodash');

// specific application imports
let config = require('./config'),
    feeds = {
        nhl: require('./feeds/nhl')
    };

// get all enabled users
let enabledUsers = _(config.users)
    .filter(user => user.enabled)
    .value();

// for each user, get all enabled feeds and return content
_(enabledUsers)
    .forEach((user) => {
        let feedPromises = _(user.feeds)
            .filter(feed => feed.enabled)
            .map(feed => feeds[feed.name].getFeedData(feed))
            .value();

        Promise.all(feedPromises).then(values => {
            let items = _(values)
                .flatten()
                .value();

            console.log(`${user.name}: ${items}`);
        });
    });