const Appointment = require("../models/Appointment");
const genAI = require("../config/gemini");
const sendEmail = require("../utils/sendEmail");

exports.bookAppointment = async (req, res) => {

    try {

        const body = req.body;

        const alreadyBooked = await Appointment.findOne({

            doctor: body.doctor,

            appointmentDate: body.appointmentDate

        });

        if (alreadyBooked)

            return res.json({

                message: "Slot Already Booked"

            });

        let summary = "";

        let urgency = "Low";

        try {

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash"
            });

            const prompt = `Analyse these symptoms and return urgency level, chief complaint and 3 questions.

Symptoms:

${body.symptoms}`;

            const result = await model.generateContent(prompt);

            summary = result.response.text();

        } catch {

            summary = "AI Service Unavailable";

        }

        body.aiSummary = summary;

        body.urgency = urgency;

        const appointment = new Appointment(body);

        await appointment.save();

        await sendEmail(

            body.email,

            "Appointment Booked",

            "Your Appointment has been booked."

        );

        res.json(appointment);

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.getAppointments = async (req, res) => {

    const data = await Appointment.find()

        .populate("doctor")

        .populate("patient");

    res.json(data);

};