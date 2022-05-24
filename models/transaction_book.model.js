const mongoose = require('mongoose');
const {Schema}=mongoose; 

const transactionBkSchema=new Schema({
    book:{
        type:Schema.Types.ObjectId,
        ref:'books',
        required:[true,'Must containt book id']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:[true,'Must containt user id']
    },
    star:{
        type:Number,
        validate:{
            validator:Number.isInteger,
            message: '{VALUE}  is not an Integer value'
        },
        min:[0,'Must be greater than 0'], 
        required:true,
    }
})

/**
 * @typedef transactionBkSchema
 */

const transactionBkModel=mongoose.model('transactionBooks',transactionBkSchema)