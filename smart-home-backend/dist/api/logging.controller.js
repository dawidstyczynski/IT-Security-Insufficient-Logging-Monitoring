"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingController = void 0;
const express_1 = require("express");
const database_table_enum_1 = require("../config/database-table.enum");
const database_service_1 = require("../services/database.service");
const router = express_1.Router();
const databaseService = new database_service_1.DatabaseService();
router.post('/', (req, res) => {
    console.log('Request to post log.');
    let log = req.body;
    databaseService.insert(log, database_table_enum_1.DatabaseTable.Log)
        .then(success => {
        res.status(200).send(success);
    })
        .catch(error => {
        console.log(error);
        res.status(500).send();
    });
});
router.get('/', (req, res) => {
    console.log('Request to get logs.');
    console.log(req.body);
    console.log(req.params);
    let filter = req.body;
    databaseService.getSomeEntries(filter, database_table_enum_1.DatabaseTable.Log)
        .then(logs => {
        res.status(200).send(logs);
    })
        .catch(error => {
        console.log(error);
        res.status(500).send();
    });
});
exports.loggingController = router;
