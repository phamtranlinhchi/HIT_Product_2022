const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");

const defaultRoutes = [
  {
    path: "/api/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
