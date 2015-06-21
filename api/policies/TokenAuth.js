/**
 * TokenAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

    // By pass url
    var byPassUrl = '/user|'
                        +'/login';

    // Get request uri
    if (req.method != 'options' && req.method != 'OPTIONS' && !req.isSocket){

    // Check by pass url
        var uri = req.originalUrl;
        uri = uri && uri.indexOf('?') > 0 ? uri.substring(0, uri.indexOf('?')) : uri;

        if( byPassUrl.indexOf(uri) > -1 || !uri ) {

            return next();

        } else {
    // Get auth-token
    var token = req.headers["auth-token"];
    // use for browser test
    if(!token) token = req.param("auth-token");
    if ( token && token != '') {

        UserService.checkToken(token, function(err, result){
            if (!err) {
                if ( result && Object.keys(result).length > 0 ){
                    return next();
                }
            } else {
			// User is not allowed
			// (default res.forbidden() behavior can be overridden in `config/403.js`)
			return res.forbidden('Error when authen.');
			}

        })
    } else {
    	// User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
    }

}
}
};
