/**
 * Created by epotignano on 19/03/16.
 */
var Config = require('./config');
process.env.FB_NAME = Config.get('/firebase/FB_NAME')
process.env.FB_TOKEN = Config.get('/firebase/FB_TOKEN')
// process.env.BONSAI_URL = Config.get('/firebase/BONSAI_URL')
