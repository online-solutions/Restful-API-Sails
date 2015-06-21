/**
* UserToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userId: {
      type: 'INTEGER',
      columnName: 'user_id',
      model: 'User'
    },
  	token: 'STRING',
  	expiredTime: {
  		type:'DATETIME',
  		columnName: 'expired_time',
  		defaultsTo: function () {
        var now = new Date();
				now.setDate(now.getHours() + 7);
        return now;
      }
  }
}
};