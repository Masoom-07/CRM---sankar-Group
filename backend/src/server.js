const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initDB } = require("./db");
const leadsRouter = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// using for routes
app.use("/api/leads", leadsRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Lead CRM API is running.", version: "1.0.0" });
});

// for 404 handle
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});


app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error." });
});


async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📋 API Endpoints:`);
    console.log(`   GET    /api/leads`);
    console.log(`   GET    /api/leads/stats`);
    console.log(`   GET    /api/leads/:id`);
    console.log(`   POST   /api/leads`);
    console.log(`   PATCH  /api/leads/:id`);
    console.log(`   DELETE /api/leads/:id`);
  });
}

start();
