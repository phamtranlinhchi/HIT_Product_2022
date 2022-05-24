const mongoose=require('mongoose'); //
const {Schema}=mongoose; //

const commentPostSchema=new Schema({
    users:[{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:[true,'Must containt user id']
    }],
    post:{
        type:Schema.Types.ObjectId,
        ref:'posts', 
        required:[true,'Must containt post id ']
    },
    commentPostContent:{
        type:String, 
        trim:true, 
        required:[true,'Must containt comment post content']
    },
    commentPostDate:{
       type:Date, 
       required:[true,'Must containt date now ']
    }
})


//Assign commentPostDate = Date() pre save 
commentPostSchema.pre('save',function(next){
    const now=new Date(); //
    this.commentPostDate=now; //
    next(); 
})

//Populate username of user document pre find 
commentPostSchema.pre(/^find/,function(next){
    this.populate({
        path:'users',
        select:'username'
    })
})
/**
 * @typedef commentPostModel
 */

const commentPostModel=mongoose.model('commentPosts',commentPostSchema)