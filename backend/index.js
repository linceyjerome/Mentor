const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const mentorsFile = "./data/mentors.json";
const studentsFile = "./data/students.json";

// Lire un fichier JSON
function readData(file) {
  const content = fs.readFileSync(file);
  return JSON.parse(content);
}

// Écrire dans un fichier JSON
function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// POST /mentors : ajouter un mentor
app.post("/mentors", (req, res) => {
  const mentors = readData(mentorsFile);
  const newMentor = { id: Date.now(), ...req.body };
  mentors.push(newMentor);
  writeData(mentorsFile, mentors);
  res.status(201).json(newMentor);
});

// GET /mentors?search=quelqueChose
app.get("/mentors", (req, res) => {
  const search = req.query.subject?.toString().toLowerCase();
  const mentors = readData("data/mentors.json");

  if (!search) return res.json(mentors);

  const filtered = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(search) ||
    mentor.subjects?.some((s) =>
      s.toLowerCase().includes(search)
    )
  );

  res.json(filtered);
});


// POST /students : ajouter un étudiant
app.post("/students", (req, res) => {
  const students = readData(studentsFile);
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  writeData(studentsFile, students);
  res.status(201).json(newStudent);
});

// GET /students?subject=... (optionnel)
app.get("/students", (req, res) => {
  const subject = req.query.subject?.toLowerCase();
  const students = readData(studentsFile);

  const result = subject
    ? students.filter((s) =>
        s.subject?.toLowerCase().includes(subject)
      )
    : students;

  res.json(result);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Backend MENTOR démarré sur http://localhost:${PORT}`);
});
