function showMessage(elementId, message, isSuccess = true) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${isSuccess ? 'success' : 'error'}`;
  messageEl.style.display = 'block';
  
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 3000);
}

function addEquipment() {
    const name = document.getElementById("name");
    const type = document.getElementById("type");
    const location = document.getElementById("location");
    
    // Validate inputs
    if (!name.value.trim() || !type.value.trim() || !location.value.trim()) {
      showMessage("equipmentMessage", "Please fill in all fields", false);
      return;
    }
    
    fetch("http://localhost:3000/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value.trim(),
        type: type.value.trim(),
        location: location.value.trim()
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(text || "Server error: " + res.status);
        });
      }
      return res.text();
    })
    .then(data => {
      showMessage("equipmentMessage", data, true);
      name.value = "";
      type.value = "";
      location.value = "";
    })
    .catch(err => {
      let errorMsg = err.message;
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        errorMsg = "Cannot connect to server. Make sure the server is running on port 3000.";
      }
      showMessage("equipmentMessage", "Error: " + errorMsg, false);
    });
  }
  
  function logMaintenance() {
    const eid = document.getElementById("eid");
    const mtype = document.getElementById("mtype");
    const fault = document.getElementById("fault");
    const date = document.getElementById("date");
    
    // Validate inputs
    if (!eid.value || !mtype.value || fault.value === "" || !date.value) {
      showMessage("maintenanceMessage", "Please fill in all fields", false);
      return;
    }
    
    fetch("http://localhost:3000/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        equipment_id: parseInt(eid.value),
        maintenance_type: mtype.value,
        fault_count: parseInt(fault.value),
        maintenance_date: date.value
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(text || "Server error: " + res.status);
        });
      }
      return res.text();
    })
    .then(data => {
      showMessage("maintenanceMessage", data, true);
      eid.value = "";
      mtype.value = "";
      fault.value = "";
      date.value = "";
    })
    .catch(err => {
      let errorMsg = err.message;
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        errorMsg = "Cannot connect to server. Make sure the server is running on port 3000.";
      }
      showMessage("maintenanceMessage", "Error: " + errorMsg, false);
    });
  }
  