let _ = require('lodash'),
    twilio = require('twilio');

// string.format
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
}

// specific application imports
let config = require('./config'),
    feeds = {
        nhl: require('./feeds/nhl'),
        weather: require('./feeds/weather')
    };

module.exports = function (context, timer) {
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
                .flatten()
                .value();

            Promise.all(feedPromises).then(values => {
                let items = _(values)
                    .flatten()
                    .value();

                context.bindings.message = [];
                context.bindings.message.push = {
                    body: _.join(items, '\n'),
                    to: user.mobile
                };
            });
        });

    context.done();
};