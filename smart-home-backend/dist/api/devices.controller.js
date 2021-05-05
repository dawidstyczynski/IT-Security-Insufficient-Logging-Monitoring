"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicesController = void 0;
const express_1 = require("express");
const database_table_enum_1 = require("../config/database-table.enum");
const database_service_1 = require("../services/database.service");
const router = express_1.Router();
const databaseService = new database_service_1.DatabaseService();
router.get('/', (req, res) => {
    console.log('Request to get all devices..');
    databaseService.getAllEntries(database_table_enum_1.DatabaseTable.Devices)
        .then((devices) => res.status(200).send(devices))
        .catch((error) => res.status(500).send());
});
router.post('/', (req, res) => {
    console.log('Request to post a IoT Device');
    let entity = req.body;
    databaseService.insert(entity, database_table_enum_1.DatabaseTable.Devices)
        .then((success) => res.status(200).send(success))
        .catch((error) => res.status(500).send());
});
router.patch('/', (req, res) => {
    let { filter, data } = req.body;
    console.log('Request to patch a IoT Device');
    databaseService.patch(data, filter, database_table_enum_1.DatabaseTable.Devices)
        .then((success) => res.status(200).send(success))
        .catch((error) => res.status(500).send());
});
exports.devicesController = router;
