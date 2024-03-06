const schema = require('../models/role')
const asyncWrapper = require('../middleware/async-wrapper')
const {created,conflict,ok} = require('../middleware/response')
const _ = require('lodash')

const createRole = asyncWrapper(async(req,res)=>{
    //check role exist or not
    role_name = req.body.role_name.toLowerCase();
    const roleExist = await schema.exists({role_name:role_name});
    if(roleExist){
        // make first character become capitalize
        role_name = _.capitalize(role_name)
        return conflict(res,`${role_name} role already exist`)
    }

    //insert schema to db
    const data = await schema.create(req.body)
    created(res,data,`Role ${data.role_name} is created`)
})

const getRoles = asyncWrapper(async(req,res)=>{
    const {role_name,created_date,sort,fields,start_date,end_date} = req.query
    const queryObject = {}
    
    if(role_name){
        queryObject.role_name = role_name
    }

    if(start_date){
        queryObject.created_at = { $gte: new Date(start_date) };
    }
    if(end_date){
        // Assuming you want to include roles created until the end_date day
        queryObject.created_at = {
            ...queryObject.created_at,
            $lte: new Date(end_date)
        };
    }

    // Execute the query
    let result = schema.find(queryObject);
    if(sort){ 
       const sortList = sort.split(',').join(' ');
       result = result.sort(sortList)
    }else{
        result = result.sort('created_at')
    }

    if(created_date){
        queryObject.created_at = { $gte: new Date(created_date) };
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit;

    result = result.skip(skip).limit(limit)

    const data = await result
    return ok(res,`Retrieved ${data.length} roles`,data)

})

module.exports = {
    createRole,
    getRoles
}