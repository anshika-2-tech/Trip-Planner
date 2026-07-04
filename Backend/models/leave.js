const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },

    leaveDate: {
        type: Date,
        required: true
    },

    reason: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Leave", leaveSchema);