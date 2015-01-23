var pongular = require('pongular').pongular;

pongular.module('app.auth')
.factory('Auth',
    function(UserModel, $q, $jwt, $config, $expressJwt) {
        var self = this;

        function check(hash){
            var deferred = $q.defer();

            UserModel.findOne(
                {
                    hash: hash
                },
                'hash'
            )
            .exec()
            .then(
                function(res){
                    if (!res) {
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
            interceptor: function () {
                return $expressJwt(
                    {
                        secret: $config.get('app.secret')
                    }
                );
            },
            errorHandler: function () {
                return function (err, req, res, next) {
                    if (err.name === 'UnauthorizedError'){
                        res.status(401).json({
                            error: 'Invalid Token!'
                        });
                    }
                    return next();
                };
            },
            login: function(name, password){

                var deferred = $q.defer();

                UserModel.findOne(
                    {
                        name: name,
                        password: password
                    },
                    'name hash'
                ).exec()
                .then(
                    function (ret) {
                        if (!ret) {
                            deferred.reject(res);
                        }

                        var token =  $jwt.sign(ret,
                                                $config.get('app.secret'),
                                                    {
                                                        expiresInMinutes: 60*5
                                                    }
                                                );
                        deferred.resolve({token: token});
                    },
                    function(res) {
                        deferred.reject(res);
                    }
                );

                return deferred.promise;
            }
        };
    }
);
