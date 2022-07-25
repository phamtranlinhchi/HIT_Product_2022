const mongoose = require("mongoose"); //
const { Schema } = mongoose;

const statusBkUserSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "books",
        required: [true, "Must contain book id "],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Must contain user id"],
    },
    statusBookUser: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE}  is not an Integer value",
        },
        min: [0, "Must be greater than 0"],
        required: true,
    },
});

/**
 * @typedef statusBkUserModel
 */

const statusBkUserModel = mongoose.model("statusBkUsers", statusBkUserSchema);

module.exports = statusBkUserModel;
