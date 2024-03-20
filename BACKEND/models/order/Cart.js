const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Cart
const CartSchema = new mongoose.Schema({
    cartId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String
    },
    password: {
        type: String // Assuming there is a password field in the Cart table
    }
});

// Hash the password before saving
CartSchema.pre('save', async function(next) {
    // Hash the password if it exists
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Create the Cart model
const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;