const Prescription = require("../models/Prescription");
const genAI = require("../config/gemini");

exports.addPrescription = async (req, res) => {

    try {

        const body = req.body;

        let summary = "";

        try {

            const model = genAI.getGenerativeModel({

                model: "gemini-1.5-flash"

            });

            const prompt = `Convert these notes into patient friendly summary.

${body.notes}`;

            const result = await model.generateContent(prompt);

            summary = result.response.text();

        }

        catch {

            summary = "AI Summary Not Available";

        }

        body.aiSummary = summary;

        const prescription = new Prescription(body);

        await prescription.save();

        res.json(prescription);

    }

    catch (err) {

        res.status(500).json(err);

    }

};

exports.getPrescriptions = async (req, res) => {

    const data = await Prescription.find()

        .populate({

            path: "appointment",

            populate: ["doctor", "patient"]

        });

    res.json(data);

};