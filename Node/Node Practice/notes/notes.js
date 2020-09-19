const fs = require('fs');
const getNotes = function() {
    return ' Your notes';
}

const addNotes = function(title, body) {
    const notes = loadNotes()
}

const loadNotes = function() {
    const noteString = fs.readFileSync('notes.json').toString();
    const noteParse = JSON.parse(noteString);
    return noteParse;
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes
}