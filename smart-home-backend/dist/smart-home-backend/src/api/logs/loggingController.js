"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingController = void 0;
const express_1 = require("express");
const router = express_1.Router();
router.post('/', (req, res) => {
    console.log('Request to post log.');
});
router.get('/:username/:id', (req, res) => {
    console.log('Request to get logs');
});
exports.loggingController = router;
