import { table } from 'rethinkdb';
import { Connection, r, RDatum } from 'rethinkdb-ts';
import * as databaseConfig from '../config/database-config.json';

export class DatabaseService {
      constructor() {}

      /// returns: A promise that returns true if initialization was successful.
      public initialize(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                  this.connect().then((connection: Connection) => {
                        r.dbList()
                        .contains(databaseConfig.databaseName)
                        .do((containsDb: RDatum<boolean>) => {
                              return r.branch(containsDb, { created: 0 }, r.dbCreate(databaseConfig.databaseName));
                        }).run(connection).then(() => {
                              console.log("database initialized");
                              this.createTables(connection);
                        });
                  }).catch((error) => {
                        reject(error);
                  });
            });
      }

      public connect(): Promise<Connection> {
            return new Promise<Connection>((resolve, reject) => {
                  r.connect({
                        host: databaseConfig.host,
                        port: databaseConfig.port
                  })
                  .then((connection: Connection) => {
                        resolve(connection);
                        console.log("connected");
                  })
                  .catch((error) => {
                        console.log("connection refused.");
                        reject();
                  });
            });
      }

      private createTables(connection: Connection) {
            databaseConfig.tables.forEach((table) => {
                  this.createTable(connection, table.name, table.primaryKey)
            });
      }

      private createTable(connection: Connection, tableName: string, primaryKey: string) {
            r.db(databaseConfig.databaseName)
            .tableList()
            .contains(tableName)
            .do((containsTable: any) => {
                  return r.branch(containsTable, {created: 0}, r.db(databaseConfig.databaseName)
                  .tableCreate(tableName, { primaryKey: primaryKey }));
            })
            .run(connection);
            console.log("table created");
      }
}


export class UserTableService{

      constructor(){
      }

      public async RegisterUser(entry: UserRecord): Promise<UserRecord> {
            let conn = await this.connect();

            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name} ).run(conn);

            if (exists.length === 0)
            {
                  let result = await r.db('itsecurity').table('users').insert({
                  name: entry.name,
                  password: entry.password,
                  }).run(conn);

                  if (result.inserted === 0){
                        throw new Error('Can not create user.');
                  }

                  let user = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name} ).run(conn);
                  console.log('User registered.');
                  return user[0];
            }

            throw new Error('Username already exists.');
      }

      public async LoginUser(entry: UserRecord): Promise<UserRecord> {
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: entry.name, password: entry.password} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('User not found.');
            }

            console.log('User exists.');
            return exists[0];
      }

      public async ChangePW(id : string, entry: ChangePWRecord): Promise<UserRecord>{
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id, password: entry.oldPW} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('');
            }

            let update = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id, password: entry.oldPW} ).update( {password: entry.newPW} ).run(conn);
            let foundUsers = await r.db('itsecurity').table<UserRecord>('users').filter( {name: id} ).run(conn);
            return foundUsers[0];
      }

      public async ChangeEmail(user: UserRecord): Promise<UserRecord>{
            let conn = await this.connect();
            let exists = await r.db('itsecurity').table<UserRecord>('users').filter( {name: user.name, password: user.password} ).run(conn);

            if (exists.length === 0)
            {
                  throw new Error('');
            }

            let update = await r.db('itsecurity').table<UserRecord>('users').filter( {name: user.name} ).update( {
                  name: user.name, 
                  password: user.password, 
                  email: user.email
            }).run(conn);

            let foundUsers = await r.db('itsecurity').table<UserRecord>('users').filter({name: user.name}).run(conn);
            return foundUsers[0];
      }

      private connect() : Promise<Connection>
      {
            return r.connect({
                  host: databaseConfig.host,
                  port: databaseConfig.port
            });
      }
}

export interface ChangePWRecord{
      oldPW: string,
      newPW: string,
}

export interface UserRecord{
      name: string,
      password: string,

      email: string,
}