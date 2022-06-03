const httpStatus = require("http-status");
const { Post } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const createPost = async(postBody) => {
    return Post.create(postBody);
};

const getPosts = async(postQuery) => {
    const features = new APIFeatures(Post.find(), postQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const posts = await features.query;
    return posts;
};

const getPostById = async(id) => {
    return Post.findById(id);
};

const updatePostById = async(postId, updateBody) => {
    const post = await Post.findByIdAndUpdate(postId, updateBody, {
        new: true,
        runValidators: true,
    });
    if (!post) {
        throw new ErrorResponse("Post not found", httpStatus.NOT_FOUND);
    }
    return post;
};

const deletePostById = async(postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new ErrorResponse("Post not found", httpStatus.NOT_FOUND);
    }
    await post.remove();
    return post;
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
};