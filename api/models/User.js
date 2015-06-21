/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		id: {
            columnName: 'id',
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true
        },
		email: {
			type: 'EMAIL',
			required: true,
			unique: true
		},
		password: {
			type: 'STRING',
			required: true,
			minLength: 2
		},
        fullname: {
            type: 'STRING',
            minLength: 3,
            columnName: 'full_name'
        }
	},

	tableName: 'users',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,

    // Lifecycle Callbacks
    beforeCreate: function (values, cb) {

        // Encrypt password
        CryptUtil.encryptPassword(values.password, function(err, result){

            // Check error
            if ( !err ) {

                // Assign encrypted password into password field and run callback function with out any error
                values.password = result;
                cb();

            } else {
                // Run callback function with error
                cb(err);
            }
        })
    },

    beforeUpdate: function (values, cb) {

        // Encrypt password
        CryptUtil.encryptPassword(values.password, function(err, result){

            // Check error
            if ( !err ) {

                // Assign encrypted password into password field and run callback function with out any error
                values.password = result;
                cb();

            } else {
                // Run callback function with error
                cb(err);
            }
        })
    },
};

