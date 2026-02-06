const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("AI Backend is running");
});

module.exports = app;
