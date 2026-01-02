const express = require("express");
const cors = require("cors");
const db = require("./db");
const { createObjectCsvWriter } = require("csv-writer");

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Electrical Maintenance API is running",
    endpoints: {
      "POST /equipment": "Add new equipment",
      "POST /maintenance": "Log maintenance",
      "GET /health/:id": "Get health index for equipment",
      "GET /export": "Export maintenance report as CSV"
    }
  });
});

// Add equipment
app.post("/equipment", (req, res) => {
  const { name, type, location } = req.body;
  db.query(
    "INSERT INTO equipment (name, type, location) VALUES (?, ?, ?)",
    [name, type, location],
    (err) => {
      if (err) return res.status(500).send("Error adding equipment");
      res.send("Equipment added");
    }
  );
});

// Log maintenance
app.post("/maintenance", (req, res) => {
  const { equipment_id, maintenance_type, fault_count, maintenance_date } = req.body;
  db.query(
    "INSERT INTO maintenance VALUES (NULL, ?, ?, ?, ?)",
    [equipment_id, maintenance_type, fault_count, maintenance_date],
    (err) => {
      if (err) return res.status(500).send("Error logging maintenance");
      res.send("Maintenance logged");
    }
  );
});

// Health Index Logic
app.get("/health/:id", (req, res) => {
  db.query(
    "SELECT SUM(fault_count) as faults FROM maintenance WHERE equipment_id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error fetching health data" });
      let faults = result[0].faults || 0;
      let status = faults <= 2 ? "Good" : faults <= 5 ? "Average" : "Poor";
      res.json({ faults, health: status });
    }
  );
});

// Export CSV
app.get("/export", (req, res) => {
  db.query(
    "SELECT e.name, e.type, m.maintenance_type, m.fault_count, m.maintenance_date FROM equipment e JOIN maintenance m ON e.id=m.equipment_id",
    (err, data) => {
      if (err) return res.status(500).send("Error exporting data");
      const csvWriter = createObjectCsvWriter({
        path: "maintenance_report.csv",
        header: [
          { id: "name", title: "Equipment" },
          { id: "type", title: "Type" },
          { id: "maintenance_type", title: "Maintenance" },
          { id: "fault_count", title: "Faults" },
          { id: "maintenance_date", title: "Date" }
        ]
      });
      csvWriter.writeRecords(data)
        .then(() => res.send("CSV Generated"))
        .catch(err => res.status(500).send("Error writing CSV: " + err));
    }
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));
