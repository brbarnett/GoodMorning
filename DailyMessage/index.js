let _ = require('lodash'),
    moment = require('moment');

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

module.exports = function (context) {
    context.bindings.queueItem = [];

    // get all enabled users
    let enabledUsers = _(config.users)
        .filter(user => user.enabled)
        .value();

    // for each user, get all enabled feeds and return content
    let promises = [];
    _(enabledUsers)
        .forEach((user) => {
            let feedPromises = _(user.feeds)
                .filter(feed => feed.enabled)
                .map(feed => feeds[feed.name].getFeedData(feed))
                .flatten()
                .value();

            promises.push(new Promise(resolve => {
                Promise.all(feedPromises)
                    .then(values => {
                        let items = _(values)
                            .flatten()
                            .value();

                        let message = moment().format('dddd, MMMM Do') + '\n\n' + _.join(items, '\n\n');
                        context.log(user.mobile, message);

                        // push to queue
                        context.bindings.queueItem.push({
                            body: message,
                            to: user.mobile
                        });
                    })
                    .then(() => {
                        resolve();  // resolve promise
                    });
            }))
        });

    // wait until all users are processed
    Promise.all(promises)
        .then(() => {
            context.log('Finished');
            context.done();
        });
};