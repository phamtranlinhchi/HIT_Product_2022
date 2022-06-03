const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { postService } = require("../services");

module.exports = {
    createPost: asyncHandle(async(req, res, next) => {
        const post = await postService.createPost(req.body);
        res.status(httpStatus.CREATED).send(post);
    }),

    getPosts: asyncHandle(async(req, res, next) => {
        const posts = await postService.getPosts(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: posts.length,
            data: {
                posts: posts,
            },
        });
    }),

    getPost: asyncHandle(async(req, res, next) => {
        const post = await postService.getPostById(req.params.postId);
        if (!post) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "Post not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            post,
        });
    }),

    updatePost: asyncHandle(async(req, res) => {
        const post = await postService.updatePostById(req.params.postId, req.body);
        res.status(httpStatus.OK).json({
            status: "success",
            post,
        });
    }),

    deletePost: asyncHandle(async(req, res) => {
        await postService.deletePostById(req.params.postId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }),
};