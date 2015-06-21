/**
 *  StringUtil
 *
 * @description :: Server-side logic for managing User
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * ` StringUtil.random()`
     */
    random: function (length) {

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }

};