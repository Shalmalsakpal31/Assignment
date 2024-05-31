const express = require("express");
const bodyparser = require("body-parser")
const app = express();
const Movie = require('./modules/moviesModel')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const PORT = 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
// GET ALL MOVIES
app.get("/api/movies", async (req, res) => {
    try {
        const movies = await Movie.find({})
        console.log(movies)
        res.status(200).json(movies);
    } catch (error) {
        console.log(error.message);
    }
});
// GET MOVIES BY ID
app.get("/api/movies/:id", async (req, res) => {
    try {
        const {id}  = req.params;
        const movies = await Movie.findById(id);
        console.log(movies);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET MOVIE BY NAME 
app.get("/api/movies/", async (req, res) =>{
    try {
        const {name1} = req.query;
        const movie = await Movie.find({name: name1});
        console.log(movie)
        // res.status(200).json(movie); 
    } catch (error) {
        res.status(500).json(error.message);
    }
    

});

// UPDATE MOVIE BY ID 
app.put("/api/movies/:id", async (req,res) => {
    
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body);
        if (!movie) {
            return res.status(404).json("Can't find the movie")
        }
        const UpdatedList = await Movie.findById(id);
        res.status(200).json(UpdatedList);
    } catch (error) {
        res.status(500).json(error.message);
    }

});


// DELETE MOVIES BY ID
app.delete("/api/movies/:id", async (req,res) => {

   try {
    const {id} = req.params;
    const movies = await Movie.findByIdAndDelete(id);
    if (!movies) {
        return res.status(404).json("Can't find the movie")
    }
    res.status(200).json("Deleted Succussfully");
   } catch (error) {
    res.status(500).json(error.message);
   }
});

// ADD MOVIES
app.post("/api/movies", async (req, res) => {
    try {
        //    res.send(req.body)
        //    console.log(req.body)
        const movie = await Movie.create(req.body)
        res.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect('mongodb+srv://adimn:12345@assignment.mi6ib8j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Assignment')
    .then(() => console.log('Connected!'));

app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`))

