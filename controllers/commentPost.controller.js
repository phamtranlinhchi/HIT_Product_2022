const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { commentPostService } = require("../services");

module.exports = {
    createCommentPost: asyncHandle(async(req, res, next) => {
        const commentPost = await commentPostService.createCommentPost(req.body);
        res.status(httpStatus.CREATED).send(commentPost);
    }),

    getcommentPosts: asyncHandle(async(req, res, next) => {
        const commentPost = await commentPostService.getCommentPosts(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: commentPost.length,
            commentPost,
        });
    }),

    getcommentPost: asyncHandle(async(req, res, next) => {
        const commentPost = await commentPostService.getcommentPostById(
            req.params.commentPostId
        );
        if (!commentPost) {
            return next(
                new ErrorResponse(httpStatus.NOT_FOUND, "Comment Post not found")
            );
        }
        res.status(httpStatus.OK).json({
            status: "success",
            commentPost,
        });
    }),

    updateCommentPost: asyncHandle(async(req, res) => {
        const commentPost = await commentPostService.updateCommentPostById(
            req.params.commentId,
            req.body
        );
        res.status(httpStatus.OK).json({
            status: "success",
            commentPost,
        });
    }),

    deletecommentPost: asyncHandle(async(req, res) => {
        await commentPostService.deleteCommentPostById(req.params.commentBookId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
        });
    }),
};