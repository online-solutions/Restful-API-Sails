
// Using BCrypt library
var bcrypt = require('bcrypt');

/**
 *  CryptUtil
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * CryptUtil.encryptPassword()
     *
     * @param password
     * @param callback
     */
    encryptPassword: function (password, callback) {

        // Encrypt password
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, hash);
            }
        });
    },

    /**
     * CryptUtil.checkPassword()
     *
     * @param password
     * @param hash
     * @param callback
     */
    checkPassword: function (password, hash, callback) {

        // Compare password
        bcrypt.compare(password, hash, function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    hashPassword: function(password){
        bcrypt.hashSync('password', 10, null);
    }

};