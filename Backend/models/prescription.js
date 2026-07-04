const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },

    medicines: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        required: true
    },

    followUpDate: Date,

    aiSummary: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Prescription", prescriptionSchema);