const asyncWrapper = require("./async-wrapper");

const response = (res,status,data,code,message)=>{
    return res.status(code).json({
        data:data,
        code:code,
        status:status,
        message:message})
}

const payloadTooLargeResponse = (res)=>{
    return response(res,'PAYLOAD_TOO_LARGE',null,413,`File size too large`)
}

const limitUnexpectedFile = (res)=>{
    return response(res,'UNSUPPORTED_MEDIA_TYPE',null,415,`Unexpected file type`)
}

const invalidFileType = (res)=>{
    return response(res,'INVALID_FORMAT',null,403,`Invalid File Type`)
}

const conflict = (res,message)=>{
    return response(res,'CONFLICT',null,409,message)
}

const created = (res,data,message)=>{
    return response(res,'CREATED',data,201,message)
}

const badRequest =(res,message)=>{
    return response(res,'BAD_REQUEST',null,400,message)
}

const notFound =(res,message)=>{
    return response(res,'NOT_FOUND',null,404,message)
}

const badGateway = (res,message,data)=>{
    return response(res,'BAD_GATEWAY',data,500,message)
}

const ok = (res,message,data)=>{
    return response(res,`OK`,data,200,message)
}



module.exports = {
    payloadTooLargeResponse,
    limitUnexpectedFile,
    invalidFileType,
    response,
    conflict,
    created,
    badRequest,
    notFound,
    badGateway,
    ok
};








// const responseMiddleware = (req, res, next) => {
//     res.customResponse = (data, code = 200, message = 'Success') => {
//         res.status(code).json({
//             data: data,
//             code: code,
//             status: (code === 200) ? 'success' : 'error',
//             message: message
//         });
//     };
//     next();
// };