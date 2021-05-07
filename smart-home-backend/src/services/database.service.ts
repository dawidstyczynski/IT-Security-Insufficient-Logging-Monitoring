import { Connection, r, RDatum } from 'rethinkdb-ts';
import * as databaseConfig from '../config/database-config.json';
import { DatabaseTable } from '../config/database-table.enum';
import { LogModel } from '../models/log.model';
import { LogLevel } from '../models/logLevel.enum';
import { logger } from './logging.service';

export class DatabaseService {
      constructor() {}

      /**
       * Initializes the database.
       * @returns A promise that returns true if initialization was successful.
       */
      public initialize(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                  this.connect().then((connection: Connection) => {
                        r.dbList()
                        .contains(databaseConfig.databaseName)
                        .do((containsDb: RDatum<boolean>) => {
                              return r.branch(containsDb, { created: 0 }, r.dbCreate(databaseConfig.databaseName));
                        }).run(connection).then(() => {
                              logger.info("server", "Database initialized");

                              this.initializeTables(connection);
                              resolve(true);
                        })
                  }).catch((error) => {
                        logger.error("server", "Database could not be initialized");
                        reject(error);
                  });
            });
      }

      /**
       * Connects to the database.
       * @returns A Promise with the connection.
       */
      public connect(): Promise<Connection> {
            return new Promise<Connection>((resolve, reject) => {
                  r.connect({
                        host: databaseConfig.host,
                        port: databaseConfig.port
                  })
                  .then((connection: Connection) => {
                        resolve(connection);
                  })
                  .catch((error) => {
                        logger.error("server", 'Database connection failed' + error);
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
      public insert<T>(entity: T, table: DatabaseTable): Promise<Boolean> {
            return new Promise<Boolean>((resolve, reject) => {
                  this.connect()
                  .then((connection: Connection) => {
                        r.db(databaseConfig.databaseName)
                        .table(table)
                        .insert(entity)
                        .run(connection)
                        .then(() => {
                              resolve(true);
                        })
                        .catch((error) => {
                              logger.error("server", "Entity not inserted" + error);
                              reject(false);
                        });
                  })
                  .catch((error) => {
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
      public patch<T>(entity: T, filter: any, table: DatabaseTable): Promise<Boolean> {
            return new Promise<Boolean>((resolve, reject) => {
                  this.connect()
                  .then((connection: Connection) => {
                        r.db(databaseConfig.databaseName)
                        .table(table)
                        .filter(filter)
                        .update(entity)
                        .run(connection)
                        .then(() => {
                              resolve(true);
                        })
                        .catch((error) => {
                              logger.error("server", "Entity not updated: " + error);
                              reject(false);
                        });
                  })
                  .catch((error) => {
                        reject(false);
                  });
            });
      }

      /**
       * Returns all entries of a database table.
       * @param table The database table.
       * @returns A Promise with all entries of a database table.
       */
      public getAllEntries<T>(table: DatabaseTable): Promise<T[]> {
            return new Promise<T[]>((resolve, reject) => {
                  this.connect()
                  .then((connection: Connection) => {
                        r.db(databaseConfig.databaseName)
                        .table(table)
                        .filter({})
                        .run(connection)
                        .then((entries: T[]) => {
                              resolve(entries);
                        })
                        .catch((error) => {
                              logger.error("server", "Could not get entries: " + error);
                              reject(error);
                        });
                  })
                  .catch((error) => {
                        reject(false);
                  });
            });
      }

      public getFilteredEntries<T>(filter: any, table: DatabaseTable): Promise<T[]> {
            return new Promise<T[]>((resolve, reject) => {
                  this.connect()
                  .then((connection: Connection) => {
                        r.db(databaseConfig.databaseName)
                        .table(table)
                        .filter(filter)
                        .run(connection)
                        .then((entries: T[]) => {
                              resolve(entries);
                        })
                        .catch((error) => {
                              logger.error("server", 'Could not get filtered entries' + error);
                              reject(error);
                        });
                  })
                  .catch((error) => {
                        reject(false);
                  });
            });
      }

      /**
       * Initializes all tables in the database.
       * @param connection The connection to the database.
       */
      private initializeTables(connection: Connection) {
            databaseConfig.tables.forEach((table) => {
                  r.db(databaseConfig.databaseName)
                  .tableList()
                  .contains(table.name)
                  .do((containsTable: any) => {
                        return r.branch(containsTable, {created: 0}, r.db(databaseConfig.databaseName)
                        .tableCreate(table.name, { primaryKey: table.primaryKey }));
                  })
                  .run(connection);
            });
      }
}


