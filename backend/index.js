const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let mentors = [];
let students = [];

app.post("/mentors", (req, res) => {
  mentors.push(req.body);
  res.status(201).json({ message: "Mentor ajouté!" });
});


app.get("/mentors", (req, res) => {
  const subject = req.query.subject;
  const results = subject
    ? mentors.filter((m) => m.subjects.includes(subject))
    : mentors;
  res.json(results);
});

app.post("/students", (req, res) => {
  students.push(req.body);
  res.status(201).json({ message: "Etudiant ajouté!" });
}
);

app.get("/students", (req, res) => {
  const subject = req.query.subject;
  const results = subject
    ? students.filter((s) => s.subjects.includes(subject))
    : students;
  res.json(results);
});

app.listen(3000, () => console.log("Backend running on port 3000"));

