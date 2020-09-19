const fs = require('fs');
const getnotes = function() {
    return 'Your Notes..!'
}

const addnote = function(title,body) {
    const data = loadNotes();
    data.push({
        title: title,
        body: body 
    }) 
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return []
    }
        
}

module.exports = {
    getnotes: getnotes,
    addnote: addnote
}