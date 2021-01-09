const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ProductSchema = new Schema({
        category: String,
        name: String,
        price: Number
    });

module.exports = mongoose.model('Product', ProductSchema);

