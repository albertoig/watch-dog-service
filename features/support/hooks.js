'use strict';
let server = require('./../../server');
let mockery = require('mockery');
let configForTest = require('./../../config/server/config.js');


let myHooks = function () {
	this.Before((scenario, callback) => {
		console.log('Before');
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		configForTest.database.mongodb.db = configForTest.database.mongodb.testdb;
		mockery.registerMock('./config/server/config.js', configForTest);
		server = require('./../../server');
		server.start().then((response) => {
			global.server = server;
			response.forEach((data) => {
				if(data.name === 'Mongoose'){
					global.mongoose = data.instance;
				}
			});

			callback();
			//global.mongoose = response.mongoose;
		});
	});
};

module.exports = myHooks;
