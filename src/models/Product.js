const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    meansure: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

mongoose.model("Product", ProductSchema);