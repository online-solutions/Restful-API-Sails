/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Disable blueprint
	_config: {
	    actions: false,
	    shortcuts: false,
	    rest: false
  	},

  	findAllProduct: function(req, res, next){
		Product.find({}, function(err, result){
			if(err){
				return next(err);
			}

			if(result && result.length > 0){

			data = {
				message: "Find Product(s) successful",
				content: {list: result}
			}
			res.ok(data, "myview");
			} else {
				res.notFound("You are not create any Product");
			}

			
		});
	},

	findProduct: function(req, res, next){
		var id = req.param('id');
		Product.findOne(id, function(err, result){
			if(err){
				return next(err);
			}

			if ( result && Object.keys(result).length > 0 ) {
				data = {
					message: "Found Product",
					content: result
				}
				res.ok(data, "myview");
			} else {
				
				res.notFound("Not found Product");
			}

			
		});
	},

	createProduct: function(req, res, next){
		// var params = req.params.all();

		req.file('image').upload({
		dirname: '../../assets/images'
		},function (err, uploadedFiles) {
		if (err) {
			console.log("upload image error");
			return res.serverError(err);
		}
		console.log("upload image ok");

		var product = {
			name: req.param('name'),
			image: uploadedFiles[0].fd,
			catId: req.param('catId')
		};
		Product.create(product, function(err, result){
			if(err){
				return next(err);
			}

			data = {
				message: "Create Product successful",
				content: result
			}
			res.ok(data);
		});
		});

		
		
	},

	updateProduct: function(req, res, next){
		var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

		if (!id) {
            return res.badRequest('No id provided.');
        }

        Product.update(id, criteria, function (err, result) {

            if(result.length === 0) return res.notFound("Not found Product, can not update");

            if (err) return next(err);

            var data = {
            	message: "Update Product successful",
            	content: result
            }

            res.ok(data);

        });
	},

	deleteProduct: function (req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
            // DELETE ALL PRODUCTS HERE
        }
		console.log("before findOne");
		Product.findOne(id, function(err, result){
			if(err){
				return next (err);
			} else if ( result && Object.keys(result).length > 0 ) {
				Product.destroy(id, function (err) {

                if (err) return next (err);
                else {
                	var data = {
                	message: "Delete Product successful",
                	content: result
                }

                return res.ok(data);
                }
                
            });
			} else {
				return res.notFound("Not found Product, can not delete");
			}
		});
    }
};