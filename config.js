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
        $filter: 'env',
        FB_NAME: 'miclinicaweb',
        FB_HOST: 'pBttZQAEZYukX3PJ9g7nh9CjUAyhcnUdyQ2rLaft'
    }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
