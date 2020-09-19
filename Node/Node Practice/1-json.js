const fs = require('fs');
const chalk = require('chalk');


// Adding a Note..!
const addNote = function(title,body) {
    const notes = loadNotes();
    const duplicateItems = notes.filter((note) => note.title === title );

    if (duplicateItems.length !== 0) {
        console.log('Name Already Exists');
    } else {
        notes.push({
            title: title,
            author: body,
        })
        saveNotes(notes);
    }   
}


const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('jsonfile.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('jsonfile.json', data);
}

//Removing a Note..!
const removeNotes = function(title) {
    const notes = loadNotes();
    let j;
    for(let i=0; i<notes.length; i++) {
        if (notes[i].title == title) {
            j = i;
            break;
        } else {
            j = -1;
        }
    }
    console.log(j);
    if (j == -1) {
        console.log(chalk.red("oops...There is no such Note..!!"));
    } else {
        notes.splice(notes[j],1);
        console.log(chalk.green("Log removed..!"));
    }
    saveNotes(notes);
}

const listNotes = (title) => {
    const notes = loadNotes();
    let j = 0;
    notes.forEach(function(value, index){
        if (value.title === title) {
            console.log(chalk.blue("The title is : " + value.title));
            console.log(chalk.green("The Author for this title is : " + value.author));
            ++j;
        } else if (title === "all") {
            console.log(chalk.blue("The title is : " + value.title));
            console.log(chalk.green("The Author for this title is : " + value.author));
            ++j;
        } else if (j != 1) {
            ++j;
            console.log(chalk.red.inverse("No Note Found..!"));
        } 
    })
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes
}


