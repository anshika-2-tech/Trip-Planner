const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

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

    specialization: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        default: 1
    },

    workingHours: {
        type: String,
        default: "10:00 AM - 5:00 PM"
    },

    slotDuration: {
        type: Number,
        default: 30
    }

});

module.exports = mongoose.model("Doctor", doctorSchema);