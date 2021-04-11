"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationController = void 0;
const express_1 = require("express");
const usertable_service_1 = require("../../services/usertable.service");
const router = express_1.Router();
const userTable = new usertable_service_1.UserTableService();
router.post('/', (req, res) => {
    console.log('Request to register.');
    console.info(req.body);
    let user = req.body;
    userTable.RegisterUser(user)
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send();
    });
});
exports.registrationController = router;
