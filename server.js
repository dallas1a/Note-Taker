const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});



app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.post("/api/notes", (req, res) => {
    let newNoteInfo = req.body;
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (allNotes.length).toString();


    newNoteInfo.id = noteLength;

    allNotes.push(newNoteInfo);


    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});