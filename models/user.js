const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var userSchema = new Schema({

    name: { type: String }


})



module.exports = mongoose.model('user', userSchema);