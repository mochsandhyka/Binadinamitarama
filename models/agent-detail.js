const mongoose = require('mongoose')

const agentDetailSchema = new mongoose.Schema({
    agent_email : {
        type : String,
        required: [true, `Agent email is required`]
    },
    agent_phone_number: {
        type : String,
        required: [true, `Agent phone number is required`]
    }
})

module.exports = mongoose.model("agent_detail", agentDetailSchema)

