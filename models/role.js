const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_name : {
        type : String,
        required: [true, `Role name is required`]
    },
    created_at:{
        type : Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("role",roleSchema)