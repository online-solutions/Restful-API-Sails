/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Disable blueprint
	_config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
  	},

  	findAllCategory: function(req, res, next){
		Category.find({}, function(err, result){
			if(err){
				return next(err);
			}

			if(result && result.length > 0){
				var all = {list: result};

			data = {
				message: "Find Category(s) successful",
				content: all
			}
			res.ok(data, "myview");
			} else {
				res.notFound("You are not create any Category");
			}

			
		});
	},

	findCategory: function(req, res, next){
		var id = req.param('id');
		Category.findOne(id, function(err, result){
			if(err){
				return next(err);
			}

			if ( result && Object.keys(result).length > 0 ) {
				data = {
					message: "Found Category",
					content: result
				}
				res.ok(data, "myview");
			} else {
				
				res.notFound("Not found Category");
			}

			
		});
	},

	createCategory: function(req, res, next){
		var params = req.params.all();
		Category.create(params, function(err, result){
			if(err){
				return next(err);
			}

			data = {
				message: "Create Category successful",
				content: result
			}
			res.ok(data);
		});
	},

	updateCategory: function(req, res, next){
		var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

		if (!id) {
            return res.badRequest('No id provided.');
        }

        Category.update(id, criteria, function (err, result) {

            if(result.length === 0) return res.notFound("Not found Category, can not update");

            if (err) return next(err);

            var data = {
            	message: "Update Category successful",
            	content: result
            }

            res.ok(data);

        });
	},

	deleteCategory: function (req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
            // DELETE ALL CATEGORY HERE
        }
		console.log("before findOne");
		Category.findOne(id, function(err, result){
			if(err){
				return next (err);
			} else if ( result && Object.keys(result).length > 0 ) {
				Category.destroy(id, function (err) {

                if (err) return next (err);
                else {
                	var data = {
                	message: "Delete Category successful",
                	content: result
                }

                return res.ok(data);
                }
                
            });
			} else {
				return res.notFound("Not found Category, can not delete");
			}
		});
    }
};

