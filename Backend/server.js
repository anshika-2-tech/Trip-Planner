require("dotenv").config();
require("./services/cronService");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});

app.use("/api/admin",adminRoutes);
app.use("/api/patient",patientRoutes);
app.use("/api/doctor",doctorRoutes);
app.use("/api/appointment",appointmentRoutes);
app.use("/api/prescription",prescriptionRoutes);

app.get("/",(req,res)=>{
    res.send("Healthcare Appointment Manager API Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
});