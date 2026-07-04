const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: Number,

    gender: String,

    phone: String

});

module.exports = mongoose.model("Patient", patientSchema);