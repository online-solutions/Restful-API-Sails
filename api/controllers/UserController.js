/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Disabling blueprints on a per-controller basis
	_config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
  	},

	createUser: function(req, res, next){
		var params = req.params.all();
		User.create(params, function(err, result){
			if(err){
				return next(err);
			}
			// res.status = 201;
			var data = {
				message: "Create User successful",
				content: result
			}

			res.ok(data);
		});
	},

	validateUser: function(req, res, next){
		var email = req.param('email');
		var password = req.param('password');
		var user = {email: email, password: password};
		UserService.login(user, function(err, result){
			if(err){
				console.log("validate User controller error");
				console.log(err);
				return next(err);
			}
			console.log("validate User controller success");
			console.log(result);
			// res.status = 201;
			var data = {
				message: "You are logged in",
				content: result
			}
			res.ok(data);
		});
	},

	getAllUser: function(req, res, next){
		User.find({}, function(err, result){
			if(err){
				return next(err);
			}

			data = {
				message: "Get all users successful",
				content: {list: result}
			}
			res.ok(data);
		});
	},

// error
	updateUser: function(req, res, next){
		var user = {
			password: req.param('password'),
			fullname: req.param('fullname')
		}
		User.update(user, {email: req.param('email')},function(err, result){
			if(err){
				return next(err);
			}

			data = {
				message: "Update User successful",
				content: result
			}
			res.ok(data);
		});
	},

	// getOptions: function (req, res, next){
	// 	data = {
	// 			message: "ok",
	// 			content: {"list": ['GET', 'POST']}
	// 		}
	// 		res.ok(data);
	// }
	
};