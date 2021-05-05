import * as http from "http";
import { LogModel } from "../models/log.model";

export async function SendLog(log :LogModel) : Promise<void>{
    
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
