"use strict";
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
exports.UserTableService = exports.initializeDB = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const Host = '127.0.0.1';
const Port = 28015;
function initializeDB() {
    connect()
        .then((conn) => {
        console.log('Connected to DB.');
        createDB(conn);
        createTable(conn);
    })
        .catch((error) => {
        console.log('Could not connect to DB. Error :' + error);
    });
}
exports.initializeDB = initializeDB;
function createDB(conn) {
    rethinkdb_ts_1.r.dbList().contains('itsecurity').do((containsDB) => {
        return rethinkdb_ts_1.r.branch(containsDB, { created: 0 }, rethinkdb_ts_1.r.dbCreate('itsecurity'));
    }).run(conn);
}
function createTable(conn) {
    rethinkdb_ts_1.r.db('itsecurity').tableList().contains("library").do((containsTable) => {
        return rethinkdb_ts_1.r.branch(containsTable, { created: 0 }, rethinkdb_ts_1.r.db('itsecurity').tableCreate('library'));
    }).run(conn);
    rethinkdb_ts_1.r.db('itsecurity').tableList().contains("users").do((containsTable) => {
        return rethinkdb_ts_1.r.branch(containsTable, { created: 0 }, rethinkdb_ts_1.r.db('itsecurity').tableCreate('users', { primaryKey: 'name' }));
    }).run(conn);
}
function connect() {
    return rethinkdb_ts_1.r.connect({
        host: Host,
        port: Port
    });
}
class UserTableService {
    constructor() {
    }
    RegisterUser(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: entry.name }).run(conn);
            if (exists.length === 0) {
                let result = yield rethinkdb_ts_1.r.db('itsecurity').table('users').insert({
                    name: entry.name,
                    password: entry.password,
                }).run(conn);
                if (result.inserted === 0) {
                    throw new Error('Can not create user.');
                }
                let user = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: entry.name }).run(conn);
                console.log('User registered.');
                return user[0];
            }
            throw new Error('Username already exists.');
        });
    }
    LoginUser(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: entry.name, password: entry.password }).run(conn);
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
            let exists = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: id, password: entry.oldPW }).run(conn);
            if (exists.length === 0) {
                throw new Error('');
            }
            let update = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: id, password: entry.oldPW }).update({ password: entry.newPW }).run(conn);
            let foundUsers = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: id }).run(conn);
            return foundUsers[0];
        });
    }
    ChangeEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield this.connect();
            let exists = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: user.name, password: user.password }).run(conn);
            if (exists.length === 0) {
                throw new Error('');
            }
            let update = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: user.name }).update({
                name: user.name,
                password: user.password,
                email: user.email
            }).run(conn);
            let foundUsers = yield rethinkdb_ts_1.r.db('itsecurity').table('users').filter({ name: user.name }).run(conn);
            return foundUsers[0];
        });
    }
    connect() {
        return rethinkdb_ts_1.r.connect({
            host: Host,
            port: Port
        });
    }
}
exports.UserTableService = UserTableService;
