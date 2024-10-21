const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/name', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});


app.get('/name', (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Data Respresentation & Querying');
});

app.get('/hello/:name/:sname', (req, res) => {
    const name = req.params.name+ " "+req.params.sname;
    res.send(`Hello ${name}`);
});

app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies }); // Changed array name to myMovies and added status code 200 (OK)
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});