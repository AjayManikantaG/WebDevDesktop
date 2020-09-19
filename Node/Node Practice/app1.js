const yargs = require('yargs');
const notes = require('./1-json.js')


yargs.command({
    command: "add",
    describe: "adding a note..!",
    builder: {
        title: {
            describe: "Add a Note",
            optionDemand: true,
            type: "string"
        },
        body: {
            describe: "About Author",
            optionDemand: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'removing a Note..!',
    builder:  {
        title: {
            describe: "Remove a Note..!",
            optionDemand: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command: "list",
    describe: "Listing the items",
    builder: {
        title: {
            describe: "Give the title",
            optionDemand: true,
            type: "string"
        }
    },
    handler: function(argv) {
        notes.listNotes(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv);