const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    symptoms: {
        type: String,
        required: true
    },

    aiSummary: {
        type: String,
        default: ""
    },

    urgency: {
        type: String,
        default: "Low"
    },

    status: {
        type: String,
        default: "Booked"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);