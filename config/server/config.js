'use strict';

const config = require('./config.json');

module.exports = {
    app: {
        name: process.env.WDS_APP_NAME || config.app.name,
        host: process.env.WDS_APP_HOST || config.app.host,
        port: process.env.WDS_APP_PORT || config.app.port
    },
    jwt: {
        secret: process.env.WDS_JWT_SECRET || config.jwt.secret
    },
    database: {
        mongodb: {
            host: process.env.WDS_MONGODB_HOST || config.mongodb.host,
            port: process.env.WDS_MONGODB_PORT || config.mongodb.port
        },
        redis: {
            host: process.env.WDS_REDIS_HOST || config.redis.host,
            port: process.env.WDS_REDIS_PORT || config.redis.port
        }
    }
};