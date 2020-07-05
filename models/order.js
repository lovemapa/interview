const mongoose = require('mongoose');
const { schema } = require('./user');

const Schema = mongoose.Schema;


var orderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'user' },

    subtotal: Number


})



module.exports = mongoose.model('order', orderSchema);