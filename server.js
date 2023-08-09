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
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
