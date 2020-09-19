const express = require('express');
const app = express();
const path = require('path');

const filePath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, './templates');
console.log(viewsPath); 

//Setup static directory to serve
app.use(express.static(filePath));

//Setup handle bars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Ajay"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Ajay"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: "done by andrew mead",
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: "It is breezy",
        location: "chennai",
    })
})

app.listen(3000, () => console.log("Listening on port 3000"))

