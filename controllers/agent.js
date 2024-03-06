const schema = require('../models/agent')
const detailSchema = require('../models/agent-detail')
const asyncWrapper = require('../middleware/async-wrapper')
const {conflict,created,badRequest} = require('../middleware/response')
const _ = require('lodash')

const createAgent = asyncWrapper(async(req,res)=>{

    //create detail agent from req.body
    const detailAgent = new detailSchema({
        agent_email:req.body.agent_email,
        agent_phone_number:req.body.agent_phone_number
    }) 
    const agent = new schema({
        agent_name: req.body.agent_name,
        country: req.body.country,
        agent_detail:detailAgent
    })

    const agentExists = await schema.exists({agent_name:agent.agent_name});
    if(agentExists){
        // make first character become capitalize
        agent_name = _.capitalize(agent.agent_name)
        return conflict(res,`Agent ${agent.agent_name} already exist`)
    }
    
    const detail = await detailSchema.create(detailAgent);
    const data = await schema.create(agent);
    created(res,data,`Agent ${data.agent_name} is created`)
})

module.exports = {
    createAgent
}