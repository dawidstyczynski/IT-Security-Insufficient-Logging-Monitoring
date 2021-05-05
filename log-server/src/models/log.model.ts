import { LogLevel } from "./logLevel.enum";

export class LogModel {
      constructor(user :string, loglevel :LogLevel, message :string){
            this.user = user;
            this.loglevel = loglevel;
            this.message = message;
      }

      public user: string;
      public loglevel: LogLevel;
      public message: string;
}