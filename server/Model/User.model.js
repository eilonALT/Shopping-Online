const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    idNumber: Number,
    password: String,
    city: String,
    street: String,
    role: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);