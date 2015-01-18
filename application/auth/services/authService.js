var pongular = require('pongular').pongular;

pongular.module('app.auth')
.factory('Auth',
    function(UserModel, $q) {
        var self = this;

        function check(hash){
            var deferred = $q.defer();

            UserModel.find({hash: hash}).exec()
            .then(
                function(res){
                    if (res.length !== 1) {
                        deferred.reject(res);
                    } else {
                        deferred.resolve(res);
                    }
                },
                function(res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        }

        return {
            bind: function () {
                return function (req, res, next) {
                    req.auth = function() {
                        return check(req.params.hash).then(
                            function(result){
                                return result;
                            },
                            function(){
                                res.status(500).json({
                                    error: 'Validation Error'
                                });
                            }
                        );
                    };
                    return next();
                };
            },
            login: function(name, password){
                return UserModel.findOne({name: name, password: password}).exec();
            }
        };
    }
);
