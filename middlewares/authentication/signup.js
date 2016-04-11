'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let UserManager = require('./../../modules/users/user');

module.exports = (() => {
    return (req, res, next) => {
		let oUser;

		try {
			oUser = UserManager.parseJsonToUserModel(req);
		} catch (exception) {
			//TODO: Could be fine to make an ERROR provider to responses
			res.status(500).send(exception.message);
		}

        oUser.save((error)=>{
            if (error) {
                res.status(500).send(error);
            }else{
                res.status(200).send(__('User saved successfully'));
                next();
            }
        });
    };
})();
