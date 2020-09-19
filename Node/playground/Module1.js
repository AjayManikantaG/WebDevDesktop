/** @format */
const EventEmitter = require("events");
const emmiter = new EventEmitter();

emmiter.on("messageLogged", (args) => {
  console.log(`Listener Active...!! for ${args.id}`);
});

emmiter.emit("messageLogged", { id: 1 });
