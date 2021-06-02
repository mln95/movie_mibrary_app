const mongoose = require('mongoose');

const authors_Schema  = new mongoose.Schema({
    name: {type: String, required: true},
})

module.exports = mongoose.model('Author', authors_Schema);