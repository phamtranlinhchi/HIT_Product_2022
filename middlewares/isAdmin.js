const asyncHandle = require("../middlewares/asyncHandle");
const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const userService = require("../services/user.service"); 

const isAdmin=asyncHandle(async(req, res, next)=>{
    const user=req.user;
    const checkUser=await userService.getUserByEmail(user.email) ; 
    if(!checkUser){
        throw new ErrorResponse("Can not find user",httpStatus.NOT_FOUND);
    }
    if(!checkUser.role==="admin"){
        throw new ErrorResponse("Must be admin ",httpStatus.BAD_REQUEST);
    }
    next();
})
module.exports=isAdmin; 