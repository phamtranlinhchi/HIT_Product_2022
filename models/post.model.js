const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    titlePost: {
        type: String, //
        trim: true,
        required: [true, 'Must containt title post']
    },
    imagePost: {
        type: String,
        required: [true, 'Must containt image post']
    },
    viewPost: {
        type: Number, //
        validate: {
            validator: Number.isInteger,
            message: '{VALUE}  is not an integer value'
        },
        required: [true, 'Must containt view post']
    },
    descriptionPost: {
        type: String, //
        trim: true,
        required: [true, 'Must containt description post'],
    },
    typePost: {
        type: String,
        trim: true,
        required: [true, 'Must containt type post']
    },

})


// Function to sort descending by view post 
postSchema.methods.sortByView=function(){
    this.find({},function(err,result){
        if(err){
           
        }
        else{
           return result;
        }
    }).sort({viewPost:-1})
}
/**
 * @typedef postModel
 */

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;