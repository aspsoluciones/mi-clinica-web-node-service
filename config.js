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

    cloudinary: {
        $filter: 'env',
        production: {
            api_key : '381228771352367',
            api_secret : 'qp3Z3dVxuSQWIR2TmY_ica-jYio',
            cloud_name: 'ceiboit'
        },
        $default: {
            api_key : '381228771352367',
            api_secret : 'qp3Z3dVxuSQWIR2TmY_ica-jYio',
            cloud_name: 'ceiboit'
        }
    },
    firebase: {
        "FB_NAME": {
            "$filter": 'env',
            testing: "mcwdbtesting",
            $default: 'mcwdb'
        },

        "FB_URL" : {
            "$filter": 'env',
            testing: 'aRandomUrl',
            $default: 'https://mcwdb.firebaseio.com'
        },

        "FB_TOKEN": {
            "$filter": 'env',
            "$default": 'oiyxw5T2heDgipVtH6jw6fXtYhB6Si5QY1DxDgg3',
            testing: 'oiyxw5T2heDgipVtH6jw6fXtYhB6Si5QY1DxDgg3'
        },
        BONSAI_URL : {
            "$filter" : 'env',
            "$default" : 'https://j4scjsgnhz:ausg7wee4e@miclinicaweb-6638039142.ap-southeast-2.bonsai.io',
            "DEV" : 'https://j4scjsgnhz:ausg7wee4e@miclinicaweb-6638039142.ap-southeast-2.bonsai.io'
        }
    },
    good: {
        $filter: 'env',
        development: {
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
        },

        $default: {
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
    },

    applicationModules:  {
        $filter: 'env',
        DEV: {
            'elasticsearch-firease': 'elasticsearch-firebase/service',
            'algolia-firebase': 'algolia-firebase/service',
            'jobs' : 'jobs/service',
            'cloudinary': 'cloudinary/service',
            'queue': 'queues/service'
        },

        PROD: {
            'elasticsearch-firease': 'elasticsearch-firebase/service',
            'algolia-firebase': 'algolia-firebase/service',
            'jobs' : 'jobs/service',
            'cloudinary': 'cloudinary/service',
            'queue': 'queues/service'
        },

        $default: {
            'elasticsearch-firease': 'elasticsearch-firebase/service',
            'algolia-firebase': 'algolia-firebase/service',
            'jobs' : 'jobs/service',
            'cloudinary': 'cloudinary/service',
            'queue': 'queues/service'
        }
    }



};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
