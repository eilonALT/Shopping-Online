const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    totalPrice: Number,
    city: String,
    street: String,
    shippingDate: Date,
    orderCreated: Date,
    creditCard: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);