'use strict';

var Config = require('../../config');
var RequireAppModules = require('../modules/modules.index').requireApplicationModules;

/**Require all the files that our app will need for work **/
RequireAppModules();

exports.register = function (server, options, next) {
    server.register({
        register: require('good'),
        options: Config.get('/good')
    })
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply({ message: 'Welcome to the plot device.' });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'api'
};