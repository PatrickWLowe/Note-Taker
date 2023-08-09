const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

app.post("/api/notes", function (req, res) {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 10000),
  };
  const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
  const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  const newNotes = notes.filter((note) => note.id != req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
