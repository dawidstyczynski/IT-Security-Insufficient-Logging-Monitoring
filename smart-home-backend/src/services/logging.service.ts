import * as http from "http";
import { LogModel } from "../models/log.model";
import { configure, getLogger } from "log4js";
import * as log4js from "log4js";
import { LogLevel } from "../models/logLevel.enum";

class Logger {
      private logger: log4js.Logger

      constructor(name: string, level: string) {
            this.logger = getLogger('name');
            this.logger.level = level;
      }

      public setLevel(level: string) {
            this.logger.level = level;
      }

      public async info(user: string, message: string) {
            this.logger.info(message + ' ✅');
            await this.SendLog(new LogModel(user, LogLevel.Info, message))
            .catch(error => {
                  this.logger.error(error);
            });
      }

      public async warn(user: string, message: string) {
            this.logger.warn(message + ' ⚠️');
            await this.SendLog(new LogModel(user, LogLevel.Warn, message))
            .catch(error => {
                  this.logger.error(error);
            });
      }

      public async error(user: string, message: string) {
            this.logger.error(message + ' 🔥');
            await this.SendLog(new LogModel(user, LogLevel.Error, message))
            .catch(error => {
                  this.logger.error(error);
            });
      }

      private async SendLog(log :LogModel) : Promise<void>{
    
            var data = JSON.stringify(log);
      
            let options = {
                  hostname: 'log-server',
                  port: 5500,
                  path: '/log',
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                  }
            }
      
            var req = http.request(options, res =>{
            });
      
            req.on('error', e =>{
                  console.log(e);
            })
      
            req.write(data);
            req.end();
      }
}

export const logger = new Logger('smart-home-backend', 'debug');
