const Doctor = require("../models/Doctor");
const Leave = require("../models/Leave");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor)
        return res.json({
            message: "Doctor Not Found"
        });

    const match = await bcrypt.compare(password, doctor.password);

    if (!match)
        return res.json({
            message: "Wrong Password"
        });

    const token = jwt.sign(
        {
            id: doctor._id,
            role: "doctor"
        },
        process.env.JWT_SECRET
    );

    res.json({ token });

};

exports.addLeave = async (req, res) => {

    const leave = new Leave(req.body);

    await leave.save();

    res.json({
        message: "Leave Added"
    });

};