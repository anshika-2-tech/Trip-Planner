const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);

router.post("/addDoctor", adminController.addDoctor);

router.get("/doctors", adminController.getDoctors);

router.put("/doctor/:id", adminController.updateDoctor);

router.delete("/doctor/:id", adminController.deleteDoctor);

module.exports = router;