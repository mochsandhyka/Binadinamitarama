const mongoose = require('mongoose')

const newsEventSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true, `Title is required`]
    },
    link : {
        type : Array
    },
    content : {
        type : String,
        required: [true, `Content is required`]
    },
    picture : {
        type : String
    }
})

module.exports = mongoose.model("news_event", newsEventSchema)
