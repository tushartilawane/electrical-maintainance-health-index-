# Electrical Equipment Maintenance & Health Index System

A Node.js + MySQL based system to log electrical equipment maintenance activities and calculate equipment health index.

## Features
- Add electrical equipment
- Log preventive & corrective maintenance
- Health index calculation (Good / Average / Poor)
- Export maintenance reports (CSV)

## Tech Stack
- Backend: Node.js
- Database: MySQL
- Frontend: JavaScript, HTML
- Tools: Git

## Domain
Electrical Maintenance | Power Systems | Asset Health Monitoring




#database 
CREATE DATABASE electrical_maintenance;

USE electrical_maintenance;

CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(30),
    location VARCHAR(50)
);

CREATE TABLE maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT,
    maintenance_type VARCHAR(20),
    fault_count INT,
    maintenance_date DATE,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

show tables;
select * from equipment;




What is this project in simple words?

Think of this project as a digital notebook for electrical equipment.

Instead of writing maintenance details in a register or Excel, we store everything in a computer system.

This system helps us:

Keep track of electrical equipment

Record when maintenance is done

Check how healthy the equipment is

🧠 What problem does it solve?

In power plants and substations:

Many machines like transformers, motors, breakers are used

If they are not maintained properly, they can fail suddenly

This system helps engineers monitor equipment condition early

✨ Features explained very simply
1️⃣ Add Electrical Equipment

We can add machines like:

Transformer

Motor

Circuit Breaker

Example:

“Transformer-1 located in Substation-A”

2️⃣ Log Maintenance (Maintenance = Checking/Repairing)

Whenever maintenance is done, we store:

Type of maintenance

Preventive → Regular checking

Corrective → Repair after a fault

Number of faults found

Date of maintenance

This is like writing:

“Today we checked Transformer-1, found 1 fault”

3️⃣ Health Index (Good / Average / Poor)

Based on how many faults happen:

Good → Very few faults

Average → Some faults

Poor → Many faults, needs attention

So instead of reading many records, we quickly know equipment condition.

4️⃣ Export Maintenance Report (CSV)

All data can be exported as a CSV file
(CSV = Excel-like file)

This is useful for:

Reports

Audits

Sharing with seniors

🛠 Tech Stack (in very easy words)
🔹 Node.js (Backend)

This is the brain of the system

It decides what to do when data is sent or requested

🔹 MySQL (Database)

This is where all data is stored safely

Like a cupboard for information

🔹 HTML & JavaScript (Frontend)

This is the screen you see

Forms, buttons, input fields

🔹 Git

Keeps backup of code

Tracks changes (who changed what and when)

⚡ Domain (Why this is Electrical-related)

This project is related to:

Electrical Maintenance

Power Systems

Asset Health Monitoring

These are exactly used in:

Power plants

Substations

Transmission & Distribution companies

🗄 Database Explanation (VERY EASY)
1️⃣ Create Database
CREATE DATABASE electrical_maintenance;


👉 This creates a storage space for our project data.

2️⃣ Use Database
USE electrical_maintenance;


👉 Tells the computer:

“Use this database now”

3️⃣ Equipment Table
CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(30),
    location VARCHAR(50)
);


This table stores equipment details.

Example data:

id	name	type	location
1	Transformer-1	Transformer	Substation-A
4️⃣ Maintenance Table
CREATE TABLE maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT,
    maintenance_type VARCHAR(20),
    fault_count INT,
    maintenance_date DATE
);


This table stores maintenance records.

Example:

equipment_id	maintenance_type	fault_count	date
1	Preventive	1	2026-01-02
5️⃣ Relationship (Very Important)
FOREIGN KEY (equipment_id) REFERENCES equipment(id)


👉 This means:

Maintenance record is linked to equipment

No maintenance exists without equipment

6️⃣ Show Tables
show tables;


👉 Shows all tables inside the database.

7️⃣ View Equipment Data
select * from equipment;


👉 Displays all equipment records.
