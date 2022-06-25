//calls needed applications and modules
const express = require('express');
const fs = require('fs');
const path = require('path');
//allow for app express shortcut
const app = express();
//sets 3001 as the used port 
const PORT = process.env.PORT || 3001;
//call for the following middleware functions to properly pair express to each of the functions
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//uses path to join the info of the request as a response that joins it to the proper directory
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// sets the contents of the note cards based on input, pushes all notes to the db using JSON
app.post("/api/notes", (req, res) => {
    let newNoteInfo = req.body;
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (allNotes.length).toString();


    newNoteInfo.id = noteLength;

    allNotes.push(newNoteInfo);

//uses fs to add a new note to the db after changing it into a JSON string 
   fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
})

//listens on the port so that it receives the express data 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});