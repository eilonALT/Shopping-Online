const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    productName: String,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    price: Number,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);