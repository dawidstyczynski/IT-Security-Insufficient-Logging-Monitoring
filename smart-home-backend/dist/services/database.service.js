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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const rethinkdb_ts_1 = require("rethinkdb-ts");
const databaseConfig = __importStar(require("../config/database-config.json"));
class DatabaseService {
    constructor() { }
    /**
     * Initializes the database.
     * @returns A promise that returns true if initialization was successful.
     */
    initialize() {
        return new Promise((resolve, reject) => {
            this.connect().then((connection) => {
                rethinkdb_ts_1.r.dbList()
                    .contains(databaseConfig.databaseName)
                    .do((containsDb) => {
                    return rethinkdb_ts_1.r.branch(containsDb, { created: 0 }, rethinkdb_ts_1.r.dbCreate(databaseConfig.databaseName));
                }).run(connection).then(() => {
                    console.log("database initialized");
                    this.initializeTables(connection);
                    resolve(true);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Connects to the database.
     * @returns A Promise with the connection.
     */
    connect() {
        return new Promise((resolve, reject) => {
            rethinkdb_ts_1.r.connect({
                host: databaseConfig.host,
                port: databaseConfig.port
            })
                .then((connection) => {
                resolve(connection);
                console.log("connected");
            })
                .catch((error) => {
                console.log("connection refused.");
                reject();
            });
        });
    }
    /**
     * Inserts a row into the database.
     * @param entity The entity to create.
     * @param table The table in wich the entity should be created.
     * @returns A Promise that returns true if the entry was succesfully created.
     */
    insert(entity, table) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then((connection) => {
                rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .table(table)
                    .insert(entity)
                    .run(connection)
                    .then(() => {
                    console.log(table + " entity created");
                    resolve(true);
                })
                    .catch((error) => {
                    console.log(error);
                    reject(false);
                });
            })
                .catch((error) => {
                console.log('Database connection failed');
                reject(false);
            });
        });
    }
    /**
     * Updates all entries with specified filter of a database table.
     * @param entity The change to the entities.
     * @param filter The filter to get the entries which will be updated.
     * @param table The table in wich the entity should be changed.
     * @returns A Promise that returns true if the entries were succesfully changed.
     */
    patch(entity, filter, table) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then((connection) => {
                rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .table(table)
                    .filter(filter)
                    .update(entity)
                    .run(connection)
                    .then(() => {
                    console.log(table + " entity changed");
                    resolve(true);
                })
                    .catch((error) => {
                    console.log(error);
                    reject(false);
                });
            })
                .catch((error) => {
                console.log('Database connection failed');
                reject(false);
            });
        });
    }
    /**
     * Returns all entries of a database table.
     * @param table The database table.
     * @returns A Promise with all entries of a database table.
     */
    getAllEntries(table) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then((connection) => {
                rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .table(table)
                    .filter({})
                    .run(connection)
                    .then((entries) => {
                    resolve(entries);
                })
                    .catch((error) => {
                    reject(error);
                });
            })
                .catch((error) => {
                console.log('Database connection failed');
                reject(false);
            });
        });
    }
    getSomeEntries(min, max, table) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then((connection) => {
                rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .table(table)
                    .filter(rethinkdb_ts_1.r.row("id").ge(min).and(rethinkdb_ts_1.r.row("id").le(max)))
                    .run(connection)
                    .then((entries) => {
                    resolve(entries);
                })
                    .catch((error) => {
                    reject(error);
                });
            })
                .catch((error) => {
                console.log('Database connection failed');
                reject(false);
            });
        });
    }
    /**
     * Initializes all tables in the database.
     * @param connection The connection to the database.
     */
    initializeTables(connection) {
        databaseConfig.tables.forEach((table) => {
            rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                .tableList()
                .contains(table.name)
                .do((containsTable) => {
                return rethinkdb_ts_1.r.branch(containsTable, { created: 0 }, rethinkdb_ts_1.r.db(databaseConfig.databaseName)
                    .tableCreate(table.name, { primaryKey: table.primaryKey }));
            })
                .run(connection);
            console.log("table created");
        });
    }
}
exports.DatabaseService = DatabaseService;
