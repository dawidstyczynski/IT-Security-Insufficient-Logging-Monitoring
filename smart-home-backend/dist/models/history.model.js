"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModel = void 0;
class HistoryModel {
    constructor(id, user, date, message) {
        this.Id = id;
        this.User = user;
        this.Date = date;
        this.Message = message;
    }
}
exports.HistoryModel = HistoryModel;
