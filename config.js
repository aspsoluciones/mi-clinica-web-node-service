'use strict';

const Confidence = require('confidence');


const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'mi-clinica-web-node-service',
    port: {
        api: {
            $filter: 'env',
            test: 9090,
            $default: 8080
        }
    },
    firebase: {
        "FB_NAME": {
            "$filter": 'env',
            testing: "miclinicawebtesting",
            $default: 'miclinicaweb'
        },
        "FB_TOKEN": {
            "$filter": 'env',
            "$default": 'pBttZQAEZYukX3PJ9g7nh9CjUAyhcnUdyQ2rLaft',
            testing: 'pBttZQAEZYukX3PJ9g7nh9CjUAyhcnUdyQ2rLaft'
        }
    },
    good: {
        opsInterval: 1000,
        filter:{
            access_token: 'censor'
        },
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }, {
            reporter: require('good-file'),
            events: { ops: '*' },
            config: './test/fixtures/awesome_log'
        }, {
            reporter: 'good-http',
            events: { error: '*' },
            config: {
                endpoint: 'http://prod.logs:3000',
                wreck: {
                    headers: { 'x-api-key' : 12345 }
                }
            }
        }]
    }
    ,



};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
