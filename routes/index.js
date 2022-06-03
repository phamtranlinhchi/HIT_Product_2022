const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const commentBookRouter = require("./commentBook.router");
const bookRouter = require("./book.router");
const transactionRouter = require("./transaction.router");

const defaultRoutes = [
  {
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
    path: "/api/transactionBooks",
    route: transactionRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
