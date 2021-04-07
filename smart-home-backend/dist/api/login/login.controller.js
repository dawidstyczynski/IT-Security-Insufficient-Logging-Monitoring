"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const express_1 = require("express");
const usertable_service_1 = require("../../services/usertable.service");
const router = express_1.Router();
const userTable = new usertable_service_1.UserTableService();
router.post('/', (req, res) => {
    console.log('Request to log in.');
    console.info(req.body);
    userTable.LoginUser(req.body)
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
exports.loginController = router;
