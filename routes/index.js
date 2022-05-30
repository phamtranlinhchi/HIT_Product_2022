const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const commentBookRouter = require("./commentBook.router");
const bookRouter = require("./book.router");
const statusBookUserRouter = require("./statusBookUser.router");
const postRouter = require("./post.router");
const commentPostRouter = require("./commentPost.router");

const defaultRoutes = [{
        path: "/api/auth",
        route: authRouter,
    },
    {
        path: "/api/users",
        route: userRouter,
    },
    {
        path: "/api/books",
        route: bookRouter,
    },
    {
        path: "/api/commentBooks",
        route: commentBookRouter,
    },
    {
        path: "/api/status-book-user",
        route: statusBookUserRouter,
    },
    {
        path: "/api/posts",
        route: postRouter,
    },
    {
        path: "/api/comment-posts",
        route: commentPostRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;