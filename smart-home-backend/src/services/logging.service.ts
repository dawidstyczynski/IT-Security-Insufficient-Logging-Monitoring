import * as rm from "typed-rest-client/HttpClient";
import { LogModel } from "../models/log.model";

const client: rm.HttpClient = new rm.HttpClient('log-server:5500');

export async function SendLog(log :LogModel) : Promise<void>{
      var data = JSON.stringify(log);
      await client.post("/log", data).then(() =>{

      })
      .catch((error) =>{
            console.log(error);
      });
}
