const express = require("express");
const router = express.Router();

const prescriptionController = require("../controllers/prescriptionController");

router.post("/add", prescriptionController.addPrescription);

router.get("/", prescriptionController.getPrescriptions);

module.exports = router;