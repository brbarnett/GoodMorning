module.exports = function (context, queueItem) {
    context.bindings.message = {};

    context.bindings.message = {
        body: queueItem.body,
        to: queueItem.to
    };

    context.done();
};