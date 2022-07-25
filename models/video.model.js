const mongoose = require("mongoose"); //
const validator = require("validator");

const videoSchema = mongoose.Schema({
    link: {
        type: String, //
        required: true,
    },
    view: {
        type: Number, //
        min: [0, "Must at least 0, got {VALUE}"],
        required: true, //
    },
});

/**
 * @typedef videoModel
 */

const videoModel = mongoose.model("videos", videoSchema);

module.exports = videoModel;
