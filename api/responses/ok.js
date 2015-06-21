/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK (data, options) {

  var js2xmlparser = require("js2xmlparser");

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var dataWrapper = {
    status: 'success',
    message: data.message,
    data: data.content
  };

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

console.log(data);
console.log(js2xmlparser("root" ,dataWrapper));

  // If appropriate, serve data as JSON(P)
  if(req.headers.accept.indexOf('text/xml') > -1){
    console.log("Response XML");
    res.set('Content-Type', 'text/xml');
    return res.send(js2xmlparser("root" ,dataWrapper));
  } else if (req.wantsJSON) {
    console.log("Response JSON");
    return res.jsonx(dataWrapper);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    console.log("Response View");
    var type = "text/json";
    if(req.param("format") == 'json'){
      var infoData = {
        code: res.statusCode,
        accept: "POST, GET, PUT, DELETE",
        contentType: type,
        format: 'json'
      };
      return res.view(options.view, { data: dataWrapper, info: infoData });
    } else {
      type = "text/xml";
      var infoData = {
        code: res.statusCode,
        accept: "POST, GET, PUT, DELETE",
        contentType: type,
        format: 'xml'
      };
      return res.view(options.view, { data: js2xmlparser("root" ,dataWrapper), info: infoData });
    }

    
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data: data }, function couldNotGuessView () {
    return res.jsonx(data);
  });

};
