/**
 *  UserService
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

// error
	validateUser: function(user, callback){
		// Log begin function
        sails.log.info('Start service | UserService -> validateUser');
        try {
	        User.findOne({email:user.email})
	        .exec(function findOneCB(err, found){
				if(!err){
					// callback(true);
					CryptUtil.checkPassword(user.password, found.password, function(err, result){
						if(!err){
							console.log(result);
							if(result){
								delete result.password;
                                    var data = {
                                        data : true
                                    }
                                    callback(err, data);
							} else {
								console.log("Login fail");
								console.log(err);
								callback(err, null);
							}
						} else {
							callback(err, null);
						}
					});

				}

				callback(err);
			});

    	} catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }
	},

    /**
     * UserService.checkToken()
     *
     * @param userAccountInfo
     * @param userDeviceInfo
     * @param callback
     */
    checkToken: function (token, callback) {

        // Log begin function
        sails.log.info('Start service | UserService -> checkToken');

        try {

            // Find token
            UserToken.findOne({ token : token}).exec(function(err, result){

                // Check error
                if (!err) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {
                    	console.log(result);
                    	console.log("allow to do this action");
                    	 callback(false, result);
                    	// var data = {status: 'success'};
                    	// callback(err, true);

                        // Get first result
                        // var userAuthToken = result[0];

                        // Parallel series
                        // async.parallel(
                            
                        //     function(err, results){

                        //         // Check error
                        //         if( !err ) {

                        //             // Check results
                        //             if ( results && Object.keys(results).length > 0 ) {

                        //                 // Auth info
                        //                 var auth = {
                        //                     status : 'success'
                        //                 }

                        //                 // Callback with user account info
                        //                 callback(null, auth);

                        //             } else {

                        //                 // Callback with error
                        //                 callback(err, null);

                        //             }
                        //         } else {

                        //             // Callback with error
                        //             callback(err, null);
                        //         }

                        //     });
                    } else {

                        // Callback with nothing
                        callback(null, null);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> checkAuthToken');
    },

    login: function (user, callback) {

        try {

            // Check username
            User.findOne({ email : user.email }).exec(function(err, found){

                // Check error
                if (!err) {

                    // Check result
                    if ( found && Object.keys(found).length > 0 ) {

                        // Check password
                        CryptUtil.checkPassword(user.password, found.password, function(err, result){

                            // Check error
                            if( !err ){

                                // Check result
                                if ( result ) {

                                    // Assign result to data json
                                    delete result.password;
                                    var data = {
                                        data : true
                                    }

                                    // Create random token string
                                    var strRandom = StringUtil.random(64);

                                    var userToken = {
                                    	userId: found.id,
                                    	token: strRandom
                                    }

                                    // Create new user auth token
                                    UserToken.create(userToken, function(err, result){

                                        // Check error
                                        if (!err) {

                                            // Push token into data
                                            // data.token = result.token;

                                            // Create response message
                                            var response = {
                                                status : 'success',
                                                message : 'Login successfully.',
                                                token : result.token
                                            }

                                            // Callback function with result
                                            callback(err, response);

                                        } else {
                                            callback(err, null);
                                        }

                                    });
                                    //     } else {

                                    //         // Callback with error
                                    //         callback(err, null);
                                    //     }
                                    // })
                                } else {

                                    // Create error response message
                                    var response = {
                                        status : 'error',
                                        code: 703,
                                        message: 'Username or password is incorrect.1',
                                        data: {}
                                    }

                                    // Callback with response message
                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }
                        })
                    } else {

                        // Create error response message
                        var response = {
                            status : 'error',
                            code: 703,
                            message: 'Username or password is incorrect.2',
                            data: {}
                        }

                        // Callback with response message
                        callback(null, response);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> login');
    }


    }