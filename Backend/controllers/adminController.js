const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin)
            return res.status(404).json({ message: "Admin Not Found" });

        const match = await bcrypt.compare(password, admin.password);

        if (!match)
            return res.status(400).json({ message: "Wrong Password" });

        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json(err);
    }

};

exports.addDoctor = async (req, res) => {

    try {

        const data = req.body;

        const exist = await Doctor.findOne({ email: data.email });

        if (exist)
            return res.json({ message: "Doctor Already Exists" });

        data.password = await bcrypt.hash(data.password, 10);

        const doctor = new Doctor(data);

        await doctor.save();

        res.json(doctor);

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.getDoctors = async (req, res) => {

    const doctors = await Doctor.find();

    res.json(doctors);

};

exports.updateDoctor = async (req, res) => {

    const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(doctor);

};

exports.deleteDoctor = async (req, res) => {

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({
        message: "Doctor Deleted"
    });

};