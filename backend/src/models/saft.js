'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const saftSchema = new Schema({
    type: { type: String, required: true },
    data: { type: Buffer, required: true },
});

const SafT = mongoose.model('saft', saftSchema);
module.exports = SafT;
