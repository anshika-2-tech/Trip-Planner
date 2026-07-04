const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const body = req.body;

        const exist = await Patient.findOne({
            email: body.email
        });

        if (exist)
            return res.json({
                message: "Email Already Registered"
            });

        body.password = await bcrypt.hash(body.password, 10);

        const patient = new Patient(body);

        await patient.save();

        res.json(patient);

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient)
        return res.json({
            message: "Patient Not Found"
        });

    const match = await bcrypt.compare(password, patient.password);

    if (!match)
        return res.json({
            message: "Wrong Password"
        });

    const token = jwt.sign(
        {
            id: patient._id,
            role: "patient"
        },
        process.env.JWT_SECRET
    );

    res.json({ token });

};

exports.searchDoctor = async (req, res) => {

    const specialization = req.query.specialization;

    const doctors = await Doctor.find({
        specialization: {
            $regex: specialization,
            $options: "i"
        }
    });

    res.json(doctors);

};