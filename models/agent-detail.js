const mongoose = require('mongoose')

const agentDetailSchema = new mongoose.Schema({
    agentEmail : {
        type : String,
        required: [true, `Agent email is required`]
    },
    agentPhoneNumber: {
        type : String,
        required: [true, `Agent phone number is required`]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("agentDetail", agentDetailSchema)

