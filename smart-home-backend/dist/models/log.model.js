"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
class LogModel {
    constructor(id, user, date, message) {
        this.Id = id;
        this.User = user;
        this.Date = date;
        this.Message = message;
    }
}
exports.LogModel = LogModel;
