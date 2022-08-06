const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    image: {
        type: [String], //
        trim: true,
        // required: [true, "Must contain image"],
    },
    namebook: {
        type: String, //
        trim: true, //
        required: [true, "Must contain name book "],
    },
    video: {
        type: String, //
        // required: [true, "Must contain video "],
    },
    description: {
        type: String, //
        minLength: [10, "Must be at least 0, got {VALUE}"],
        required: true,
    },
    view: {
        type: Number, //
        validate: {
            validator: Number.isInteger,
            // message: "{VALUE}  is not an integr value",
        },
    },
    contentBook: {
        type: String, //
        // minLength: [10, "Must be at least 0, got {VALUE}"],
        required: true,
    },
    numberPage: {
        type: Number, //
        min: [0, "Must be at least 0, got {VALUE}"],
        validate: {
            validator: Number.isInteger,
            message: "{VALUE}  is not an integr value",
        },
    },
    star: {
        type: Number,
        min: [0, "Must be at least 0, got {VALUE}"],
        validate: {
            validator: Number.isInteger,
            message: "{VALUE}  is not an integr value",
        },
        required: true,
    },
    statusBook: {
        type: String, //
        enum: {
            values: ["vip", "common"],
            default: "common",
            message: "Invalid status of book",
        },
        required: [true, "Must containt status book "],
    },
    typeBook: {
        type: String, //
        trim: true, //
        minLength: 1,
        // required: [true, "Must contain type of book"],
    },
});

//Function to sort book by view
bookSchema.methods.sortByView = function() {
    this.find({}, function(err, book) {
        if (err) {} else {
            return book;
        }
    }).sort({ view: -1 });
};

/**
 * @typedef bookModel
 */
const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;