'use strict';

let UserManager = require('./../../modules/users/user');
let authentication = require('./../../modules/authentication/authentication');

module.exports = (() => {
    return (req, res, next) => {
        let authRequest = req.headers['authorization'];

        if(authentication.check(authRequest)){
            let userAuthentication = authentication.getUserAuthentication(authRequest);

            UserManager.checkUserFromDB(userAuthentication)
                .then((user)=>{
                    if(user.length !== 0){
                        req.signin = {user : JSON.stringify(user)};
                        next();
                    }else{
                        req.status(401).send('You must to signin on the system with the correct credencials.');
                    }
                })
                .catch((error) => {
                    res.statusCode(500).send(error);
                });
        }else{
            res.statusCode(401).send('You must to signin on the system with the correct credencials.');
        }
    };
})();