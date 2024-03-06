const schema = require('../models/news-event')
const asyncWrapper = require('../middleware/async-wrapper')
const _ = require('lodash')
const {conflict,created,badRequest} = require('../middleware/response')

const maxFileSize = process.env.MAX_SIZE_NEWS  * 1024 * 1024
const allowedFileTypes = new RegExp(`${process.env.ALLOWED_TYPES_PICTURE.split(',').join('|')}`);


const createNewsEvent = asyncWrapper(async(req,res)=>{
    let {title,content,link} = req.body
    const picture = req.file
     
    const data = await schema.create({
        title,
        content,
        link:link ? link : null,
        picture: picture ? picture.path : null
    })
    country = req.query.country
    return created(res,data,`News & Event ${title} is created`)

})

module.exports = {
    createNewsEvent,
    allowedFileTypes,
    maxFileSize
}