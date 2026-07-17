const express = require("express");
const router = express.Router();
const { callGemini } = require("../utils/gemini");

router.post("/generate-trip", async (req, res) => {
  const { userInput } = req.body;

  // Basic input validation
  if (!userInput || typeof userInput !== "string" || userInput.trim().length < 10) {
    return res.status(400).json({ error: "Please provide a valid trip description." });
  }

  let rawText;

  try {
    rawText = await callGemini(userInput.trim());
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return res.status(502).json({ error: "Failed to reach the AI service. Please try again." });
  }

  // Safely parse the AI response
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    console.error("Invalid JSON from Gemini:", rawText?.slice(0, 200));
    return res.status(422).json({ error: "AI returned an unexpected response. Please try again." });
  }

  // Validate the shape before sending to frontend
  if (!parsed.tripSummary || !Array.isArray(parsed.days) || parsed.days.length === 0) {
    return res.status(422).json({ error: "AI response was incomplete. Please try again." });
  }

  return res.json(parsed);
});

module.exports = router;
