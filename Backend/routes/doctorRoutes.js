const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

router.post("/login", doctorController.login);

router.post("/leave", doctorController.addLeave);

module.exports = router;