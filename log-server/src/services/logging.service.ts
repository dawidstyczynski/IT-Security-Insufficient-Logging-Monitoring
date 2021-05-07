import * as log4js from "log4js";
import { LogLevel } from "../models/logLevel.enum";

export function GetLogger(callerName : string){
      return log4js.getLogger(callerName);
}

export function SetUpLogger() : Promise<void>{
      return new Promise<void>((resolve, reject) => {
            try{
                  log4js.configure({
                        appenders: { 
                              console: {
                                    type: "stdout",
                                    layout: {
                                          type: "colored"
                                    }
                              },

                              info : {
                                    type: "file",
                                    filename: "info.log",
                                    keepFileExt: true,
                                    layout: {
                                          type: "basic"
                                    }
                              },

                              warn: {
                                    type: "file",
                                    filename: "warn.log",
                                    keepFileExt: true,
                                    layout: {
                                          type: "colored"
                                    }
                              },

                              error : {
                                    type: "file",
                                    filename: "error.log",
                                    layout: {
                                          type: "colored"
                                    }
                              }
                        },
                        categories: {
                              default: { 
                                    appenders: ["info", "console"], 
                                    level: LogLevel.Info 
                              },
                              problem: {
                                    appenders: ["warn"],
                                    level: LogLevel.Warn
                              },
                              risk : {
                                    appenders: ["error"],
                                    level: LogLevel.Error
                              }
                        }
                  });
                  resolve();
            }
            catch(error)
            {
                  reject(error);
            }
      });
};
