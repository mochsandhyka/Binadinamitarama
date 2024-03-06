const mongoose = require('mongoose')
const {agentDetailSchema} = require('../models/agent-detail')

const agentSchema = new mongoose.Schema({
    agent_name : {
        type : String,
        required: [true, `Agent name is required`]
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: [true, 'Country is required']
    },
    agent_detail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agent_detail', 
        required: true 
    }
})

module.exports = mongoose.model("agent", agentSchema)
