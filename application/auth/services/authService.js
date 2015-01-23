var pongular = require('pongular').pongular;

pongular.module('app.auth')
.factory('Auth',
    function(UserModel, $q, $jwt, $config, $expressJwt, $fs) {
        var self = this,
            pub = $fs.readFileSync('./certs/pub.pem');
            priv = $fs.readFileSync('./certs/priv.pem');

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
                return function (req, res, next) {
                    $jwt.verify(req.headers.authorization, pub, function (err, decoded) {
                        if (err) {
                            res.status(401).json({
                                error: 'Invalid Token!'
                            });
                        } else {
                            return next();
                        }
                    });
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
                                                    priv,
                                                    {
                                                        expiresInMinutes: 1,
                                                        algorithm: 'RS256'
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
