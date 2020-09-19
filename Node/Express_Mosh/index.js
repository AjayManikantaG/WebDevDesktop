const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let courses = [{
        id: 1,
        name: "Ajay",
    },
    {
        id: 2,
        name: "Vijay"
    },
    {
        id: 3,
        name: "Avinash1"
    }
];


// Notes :::
// CRUD operations can be done using
// app.get(),app.put(), app.post(), app.delete()

app.get('/', (req, res) => {
    res.send('Hello World..!')
});

// Get all the output
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// Get single member 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).json({msg: `The id ${req.params.id} not found in our server`})
    } else {
        res.send(course);
    }
});

// Get single member 
app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.query);
});

// Post the courses
app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).max(30).required()
    }

    const result = Joi.validate(req.body, schema);
 
    if(result.error) {
        // 400 bad request
        res.status(400).json({ msg: result.error.details[0].message })
    } else {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }
})


// Update data
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("No such course found..!");

    const schema = {
        name: Joi.string().min(3).max(30).required()
    }
    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.send(result.error.details[0].message);
        return;
    }
    courses.name = req.body.name;
    res.send(result.value); 

})

// Delete data 
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing 404 error
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) { 
        res.status(404).send("Course not found..!");
        return;
    }
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);


    //Return the same course
    res.send(course); 



})

app.listen(3000, () => console.log("Listening on port 3000"))