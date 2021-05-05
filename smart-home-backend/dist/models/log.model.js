"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
class LogModel {
    constructor(user, loglevel, message) {
        this.user = user;
        this.loglevel = loglevel;
        this.message = message;
    }
}
exports.LogModel = LogModel;
