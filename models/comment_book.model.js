const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentBookSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId, //
        ref: "books",
        required: [true, "Must contain book id"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Must contain user id "],
    },

    commentBookContent: {
        type: String, //
        trim: true,
        mingLength: [1, "Must at lest 1 characters"],
        required: [true, "Must contain comment book "],
    },
    commentBookDate: {
        type: Date,
    },
});

//Asign commentBookDate = Date() presave
commentBookSchema.pre("save", function (next) {
    const now = new Date(); //
    this.commentBookDate = now; //
    next();
});

// Populate username of user document pre find
commentBookSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "username",
    });
    next();
});

/**
 * @typedef commentBkModel
 */

const commentBkModel = mongoose.model("commentBooks", commentBookSchema);

module.exports = commentBkModel;
