const authentication = require('./authentication');
const post = require('./post');
const comment = require('./comment');

function route(app) {
    app.use('/authentication/', authentication);
    app.use('/post/', post);
    app.use('/comment/', comment);
}

module.exports = route;