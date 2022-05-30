const httpStatus = require("http-status");
const { CommentPost } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const createCommentPost = async(commentPostBody) => {
    return CommentPost.create(commentPostBody);
};

const getCommentPosts = async(commentPostQuery) => {
    const features = new APIFeatures(CommentPost.find(), commentPostQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const commentPosts = await features.query;
    return commentPosts;
};

const getcommentPostById = async(id) => {
    return CommentPost.findById(id);
};

const updateCommentPostById = async(commentPostId, updateBody) => {
    const commentPost = await CommentPost.findByIdAndUpdate(
        commentPostId,
        updateBody, {
            new: true,
            runValidators: true,
        }
    );
    if (!commentPost) {
        throw new ErrorResponse(" Comment Post not found", httpStatus.NOT_FOUND);
    }
    return commentPost;
};

const deleteCommentPostById = async(commentPostId) => {
    const commentPost = await CommentPost.findById(commentPostId);
    if (!commentPost) {
        throw new ErrorResponse("Comment Post not found", httpStatus.NOT_FOUND);
    }
    await commentPost.remove();
    return commentPost;
};

module.exports = {
    createCommentPost,
    getCommentPosts,
    getcommentPostById,
    updateCommentPostById,
    deleteCommentPostById,
};