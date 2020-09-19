
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.5.0');

yargs.command({
    command: 'add',
    describe: 'This will add new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: false,
            type: 'string',
        },

        body: {
            describe: 'Work Completion',
            demandOption: false,
            type: 'string',
        }
    },
    handler: function (argv) {
        notes.addnote(argv.title, argv.body)
    }
})

//create fight yargs command
yargs.command({
    command: 'fight',
    describe: 'The fights happened in chennai',
    builder: {
        title: {
            describe: 'fights in chennai',
            demandOption: true,
            type: 'string'
        }
        
    },
    handler: function(argv) {
        console.log('The fight happened is : ' + argv.title)
    },
})

// Create a remove command
yargs.command({
    command: 'remove',
    describe: 'To remove a note',
    handler: function() {
        console.log('Removing a note');
    }
})

// Create a list command
yargs.command({
    command: 'list',
    describe: 'To list the notes',
    handler: function() {
        console.log('Listing the notes..!')
    }
})


// create a read command
yargs.command({
    command: 'read',
    describe: 'To read the note',
    handler: function() {
        console.log('Reading the notes..!')
    }
})

yargs.command({
    command: 'write',
    describe: 'To write a note',
    handler: function() {
        console.log('Writing a Note');
    }
})

// console.log(yargs.argv);
yargs.parse();
