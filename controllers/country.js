const schema = require('../models/country')
const asyncWrapper = require('../middleware/async-wrapper')
const _ = require('lodash')
const {conflict,created,badRequest} = require('../middleware/response')

const maxFileSize = process.env.MAX_SIZE_COUNTRY  * 1024 * 1024
const allowedFileTypes = new RegExp(`${process.env.ALLOWED_TYPES_PICTURE.split(',').join('|')}`);

const createCountry = asyncWrapper(async(req,res)=>{
    //destructure
    let {country_name,description} = req.body
    console.log(country_name);
    const picture = req.file
    if(!picture){
        return badRequest(res,`You must provide a picture`)
    }
    
    //convert country name to lowercase
    country_name = country_name.toLowerCase()
    //check country is exist or not
    const countryExists = await schema.exists({country_name:country_name});
    if(countryExists){
        // make first character become capitalize
        country_name = _.capitalize(country_name)
        return conflict(res,`${country_name} Country already exist`)
    }

    //create schema
    const data = await schema.create({
        country_name,
        description,
        picture:picture.path
    })
    
    return created(res,data,`Country ${country_name} is created`)
})

const getCountry = asyncWrapper(async(req,res)=>{
    
})

module.exports = { 
    createCountry,
    allowedFileTypes,
    maxFileSize
}