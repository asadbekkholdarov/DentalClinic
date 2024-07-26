// backend/routes/reportRoutes.js
const express = require("express");
const { generateReport } = require("../controllers/reportController");
const router = express.Router();

router.get("/:period", generateReport);

module.exports = router;
