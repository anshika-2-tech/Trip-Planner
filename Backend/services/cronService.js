const cron = require("node-cron");
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

cron.schedule("0 9 * * *", async () => {

    try {

        const prescriptions = await Prescription.find()
            .populate({
                path: "appointment",
                populate: "patient"
            });

        for (const item of prescriptions) {

            if (
                item.appointment &&
                item.appointment.patient
            ) {

                await sendEmail(

                    item.appointment.patient.email,

                    "Medicine Reminder",

                    `Take your medicines:\n\n${item.medicines}`

                );

            }

        }

        console.log("Medicine reminders sent");

    } catch (err) {

        console.log(err);

    }

});