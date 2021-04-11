"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTableService = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const databaseConfig = __importStar(require("../config/database-config.json"));
class UserTableService {
    constructor() {
    }
    RegisterUser(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: entry.name }).run(conn);
            if (exists.length === 0) {
                let result = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').insert({
                    name: entry.name,
                    password: entry.password,
                }).run(conn);
                if (result.inserted === 0) {
                    throw new Error('Can not create user.');
                }
                let user = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: entry.name }).run(conn);
                console.log('User registered.');
                return user[0];
            }
            throw new Error('Username already exists.');
        });
    }
    LoginUser(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: entry.name, password: entry.password }).run(conn);
            if (exists.length === 0) {
                throw new Error('User not found.');
            }
            console.log('User exists.');
            return exists[0];
        });
    }
    ChangePW(id, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: id, password: entry.oldPW }).run(conn);
            if (exists.length === 0) {
                throw new Error('');
            }
            let update = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: id, password: entry.oldPW }).update({ password: entry.newPW }).run(conn);
            let founduser = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: id }).run(conn);
            return founduser[0];
        });
    }
    ChangeEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('user').filter({ name: user.name, password: user.password }).run(conn);
            if (exists.length === 0) {
                throw new Error('');
            }
            let update = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: user.name }).update({
                name: user.name,
                password: user.password,
                email: user.email
            }).run(conn);
            let founduser = yield rethinkdb_ts_1.r.db(databaseConfig.databaseName).table('User').filter({ name: user.name }).run(conn);
            return founduser[0];
        });
    }
    connect() {
        return rethinkdb_ts_1.r.connect({
            host: databaseConfig.host,
            port: databaseConfig.port
        });
    }
}
exports.UserTableService = UserTableService;
