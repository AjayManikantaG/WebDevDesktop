/** @format */

const express = require("express");
const app = new express();

app.use(express.json());

const courses = [
  { id: 1, name: "Ajay" },
  { id: 2, name: "Vijay" },
  { id: 3, name: "Bikku" },
];

// HTTP get method
app.get("/courses/:id", (req, res) => {
  const searchCourse = courses.find((c) => c.id === parseInt(req.params.id));
  if (!searchCourse) res.status(404).send("Document not found..!!");
  res.send(searchCourse);
});

//  HTTP post method
app.post("/courses", (req, res) => {
  if (req.body.name) {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
  } else {
      res.send("Parameters not received correctly..!!")
  }
});

// HTTP put method
app.put("/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course not found in our data base..!!");

    if(req.body.name) {
        course.name = req.body.name;
        res.send(course); 
    } else {
        res.status(400).send("Name not provided")
    }

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}..!!`));
