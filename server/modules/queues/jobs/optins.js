/**
 * Created by epotignano on 21/03/16.
 */


module.exports = function(conf, firebaseRef, data, progress, resolve, reject){
    // var emailClient = new mandrill.Mandrill('nsLooJYaZOzKNvOkhZ8eHg');
    // var emailClient = new mandrill.Mandrill(conf.mandrill.key);

    //Optin is not in the email domain whitelist => We remove it from the Queue and send and Alert to the monitoring

        //Create a Firebase User

        var newPassword = Math.random().toString(36).slice(-8);
        firebaseRef.createUser({
            email: data.email,
            password: newPassword
        }, function(err, userData) {
            if(err){
                reject(err);
            }
            else {
                //Register user's data in the user's firebase location

                firebaseRef.child('users').child(userData.uid).set({
                    email: data.email,
                    role: 'user',
                    culture: data.culture,
                    registered: false,
                    createdAt: Date.now()
                }, function(error) {
                    if (error) {
                        reject(err);
                    } else {

                        //Compose the welcome email

                        var email = {
                            to: [{
                                email: data.email
                            }],
                            merge_language: 'handlebars',
                            'global_merge_vars': [{
                                name: 'email',
                                content: data.email
                            }, {
                                name: 'password',
                                content: newPassword
                            }],
                            tags: ['optin']
                        };

                        //Send the email through Mandrill's API

                        emailClient.messages.sendTemplate({
                            template_name: conf.mandrill.template,
                            template_content: {},
                            message: email,
                            async: false
                        }, function(result) {
                            if (result[0].status === 'sent' || result[0].status === 'queued') {
                                resolve();
                            } else {
                                reject(result[0]);
                            }
                        }, function(err) {
                            reject(err);
                        });

                    }
                });
            }
        });



};