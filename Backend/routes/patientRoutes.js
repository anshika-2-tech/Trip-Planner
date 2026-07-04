const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.post("/register", patientController.register);

router.post("/login", patientController.login);

router.get("/search", patientController.searchDoctor);

module.exports = router;