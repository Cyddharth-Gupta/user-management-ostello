module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const {_, auth} = require('../middlewares');

    var router = require("express").Router();

    router.post("/", users.signup);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    router.put("/:id", auth, users.updateUser );

    router.delete("/:id", auth, users.deleteUser);

    router.post("/login", users.login);

    router.post("/changepassword", auth, users.changepassword);

    router.post("/verifypassword", auth, users.verifypassword);

    app.use('/api/users', router);
};