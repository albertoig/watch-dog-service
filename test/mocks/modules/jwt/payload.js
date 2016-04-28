'use strict';

let mocks = () => {
};

mocks.configuration = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.correctUserFromRequest = mocks.configuration;

mocks.configurationUndefinedId = {
	username: 'UserNamePrueba'
};

mocks.userFromRequestWithUndefinedId = mocks.configurationUndefinedId;

mocks.configurationUndefinedUsername = {
	_id: '1',
};

mocks.userFromRequestWithUndefinedUsername = mocks.configurationUndefinedUsername;

mocks.userFromRequestUndefined = undefined;

mocks.payload = {
	_id: '1',
	username: 'UserNamePrueba',
	encripted_at: new Date()
};

mocks.payloadIdUndefined = {
	username: 'UserNamePrueba',
	encripted_at: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadUsernameUndefined = {
	_id: '1',
	encripted_at: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadEncriptedUndefined = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.userJSON =  JSON.stringify(
	mocks.configuration
);

mocks.userJSONUndefinedId =  JSON.stringify([
	mocks.configurationUndefinedId
]);

mocks.userJSONUndefinedUsername = JSON.stringify([
	mocks.configurationUndefinedUsername
]);

module.exports = mocks;
