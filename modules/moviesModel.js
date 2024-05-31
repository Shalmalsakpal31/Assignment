const { request } = require('express')
const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema(

    {
        name:{
            type: String,
            required: [true, "Please enter the name of the movie"]
        },
        image:{
            type: String,
            required: [true,"Enter the image link"]
        },
        desp:{
            type: String,
            required: false
        }
    },
    {
        timestamps:true
    }
)


const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;