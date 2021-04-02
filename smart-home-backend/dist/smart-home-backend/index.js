"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bp = require("body-parser");
const database_service_1 = require("./services/database.service");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(cors());
database_service_1.initializeDB();
const userTable = new database_service_1.UserTableService();
app.post('/login', function (req, res) {
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
app.post('/register', function (req, res) {
    console.log('Request to register.');
    console.info(req.body);
    userTable.RegisterUser(req.body)
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
app.patch('/changePW/:id', function (req, res) {
    console.log('Request to changePW');
    let { id } = req.params;
    let changePW = req.body;
    console.log(id);
    console.log(changePW.oldPW);
    console.log(changePW.newPW);
    userTable.ChangePW(id, changePW)
        .then((user) => {
        console.log(user);
        res.status(200).send(user);
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
app.patch('/email', function (req, res) {
    console.log('Request to change email.');
    let user = req.body;
    console.log(user);
    userTable.ChangeEmail(user)
        .then((user) => {
        console.log(user);
        res.status(200).send(user);
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});
app.listen(3000, function () {
    console.log("Start listening on port: 3000");
});
