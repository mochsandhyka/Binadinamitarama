const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    country_name : {
        type : String,
        required: [true, `Country name is required`]
    },
    description : {
        type : String,
        required: [true, `Description is required`]
    },
    picture :{
        type : String,
    }
})

module.exports = mongoose.model("country", countrySchema)
