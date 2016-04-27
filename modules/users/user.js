'use strict';

let User = require('./../../models/user');
let payload = require('./../../modules/jwt/payload');
let AppError = require('./../../modules/error/manager');
let UserManager = () => {
};

/**
 * Parse User header from json to
 * @param userFromRequest
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
UserManager.parseUserToPayload = (userFromRequest) => {
		if(!UserManager.checkUserFromRequest(userFromRequest)) {
			throw AppError('WRONG_USER_FROM_REQUEST');
		}

		try{
			return payload.createPayload(userFromRequest._id, userFromRequest.username);
		}catch(exception){
			throw (exception)
		}
};

/**
 * Function to check if userFromRequest is undefined or values are empty
 * @param userFromRequest
 * @returns {boolean}
 */
UserManager.checkUserFromRequest = (userFromRequest) => {
	return !!(userFromRequest &&
	userFromRequest._id &&
	userFromRequest.username);
};

/**
 * Parse JSON request to User Model
 * @param userJson
 * @returns {User}
 */
UserManager.parseJsonToUserModel = (userJson) => {
	try {
		let userParsedJson = UserManager.getParsedBodyJSON(userJson);
		return UserManager.getUserFromJSON(userParsedJson);
	} catch (exception) {
		throw exception;
	}
};

/**
 *º Parse body to JSON or throw exception when is undefined
 * @param userJson
 * @return JSON
 */
UserManager.getParsedBodyJSON = (userJson) => {
	if (userJson === undefined || Object.keys(userJson).length === 0 ) {
		throw AppError('BODY_UNDEFINED');
	}

	return userJson;
};

/**
 * Make a new user object with JSON object, if something is not correct
 * will throw an Exception.
 * @param userJson
 * @returns {User}
 */
UserManager.getUserFromJSON = (userJson) => {
	if (!UserManager.checkUserFromJSON(userJson) && userJson) {
		throw AppError('JSON_FORMATION');
	}
	return new User(UserManager.makeUserFromJSON(userJson));
};


/**
 * Check if userJson properties are undefined or ''
 * @param userJson
 * @returns {boolean}
 */
UserManager.checkUserFromJSON = (userJson) => {
	return !(userJson.fullname === undefined || userJson.username === undefined ||
	userJson.password === undefined || userJson.email === undefined ||
	userJson.codecountry === undefined || userJson.mobilephone === undefined ||
	userJson.birthdate === undefined ||

	userJson.fullname.trim() === '' || userJson.username.trim() === '' ||
	userJson.password.trim() === '' || userJson.email.trim() === '' ||
	userJson.codecountry.trim() === '' || userJson.mobilephone.trim() === '' ||
	userJson.birthdate.trim() === '');
};

/**
 * Return and object of UserModel can understand
 * @param userJson
 * @returns {JSON}
 */
UserManager.makeUserFromJSON = (userJson) => {
	return {
		fullName: userJson.fullname,
		username: userJson.username,
		password: userJson.password,
		meta: {
			birthdate: userJson.birthdate
		},
		email: userJson.email,
		mobilePhone: userJson.mobilephone,
		codeCountry: userJson.codecountry
	};
};

/**
 * Will find on database if user exist or not, could throw and Exception if
 * UserOptions is not correct.
 * @param userAuthHeader
 * @returns {Promise}
 */
UserManager.checkUserFromDB = (userAuthHeader) => {
	return new Promise((resolve, reject) => {
		let options;

		try {
			options = UserManager.makeOptionsWithUserModel(userAuthHeader);
		} catch (exception) {
			return reject(exception);
		}

		User.findOne(options, (error, user) => {
			if (error) {
				return reject(error);
			}
			return resolve(user);
		});
	});
};

/**
 * Return options, if user is not correct will throw an Error
 * @param UserOptions
 * @returns {{username: (string), password: (string)}}
 */
UserManager.makeOptionsWithUserModel = (UserOptions) => {
	if (!UserManager.checkUserFromOptions(UserOptions)) {
		throw AppError('USER_OPTIONS');
	} else {
		return {
			username: UserOptions.username,
			password: UserOptions.password
		};
	}
};

/**
 * check if userOptions are empty or without string value
 * @param UserOptions
 * @returns {boolean}
 */
UserManager.checkUserFromOptions = (UserOptions) => {
	return !!(UserOptions &&
			UserOptions.username &&
			UserOptions.password);
};

module.exports = UserManager;
