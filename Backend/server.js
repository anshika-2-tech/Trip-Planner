const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const generateTripRoute = require("./routes/generateTrip");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api", generateTripRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Trip Planner backend is running." });
});

// 404 handler (for unknown routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler (catches malformed JSON body, unexpected throws, etc.)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});