var pongular = require('pongular').pongular;

pongular.module('nodejs').factory('IndexCtrl', function() {
  return {
    index: function(req, res){
      res.render('index', { title: 'Express' });
    }
  };
});
