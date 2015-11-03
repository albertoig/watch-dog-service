'use strict';

const config = require('./../../config/server/config.js');

exports.createPayload = (_id, username) =>{
    return {
        _id: _id,
        username: username,
        encripted_at: getCurrentDate()
    }
};

exports.checkPayload = (payload) => {
    let bDate = checkDatePayloadWithServerDate(payload);
    let bUndefined = checkUndefinedPayload(payload);

    return !!(bUndefined && bDate);
};

let checkDatePayloadWithServerDate = (payload) => {
    //TODO
};

let getCurrentDate = () => {
    //TODO
};

let checkUndefinedPayload = (payload) => {
    return !!(payload._id !== undefined &&
    payload.username !== undefined &&
    payload.updated_at !== undefined);
};
