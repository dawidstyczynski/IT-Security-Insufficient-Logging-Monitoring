import * as serverConfig from './config/server-config.json';
import { Request, Response } from 'express';
import express from "express";
import cors from 'cors';
import {SetUpLogger, GetLogger} from "./services/logging.service";
import { LogLevel } from './models/logLevel.enum';
import { LogModel } from './models/log.model';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

console.log("Started..")

server.post("/log", (req: Request, res: Response) => {
      let log : LogModel = req.body;
      let logger = GetLogger(log.user);
      
      switch(log.loglevel)
      {
            case LogLevel.Info: {
                  logger.info(log.message);
                  break;
            }

            case LogLevel.Warn: {
                  logger.warn(log.message);
                  break;
            }

            case LogLevel.Error: {
                  logger.error(log.message);
                  break;
            }
      }
  });

SetUpLogger()
.then(() =>{
      server.listen(serverConfig.port, function(){
            console.log("Server is running at port " + serverConfig.port + " ✅");
      });
})
.catch((error) =>{
      console.log(error);
})

      



