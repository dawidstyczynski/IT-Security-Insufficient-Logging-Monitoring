import * as rm from "typed-rest-client/HttpClient";
import { LogModel } from "../models/log.model";

const client: rm.HttpClient = new rm.HttpClient('smart_home');

export async function SendLog(log :LogModel) : Promise<void>{
      var data = JSON.stringify(log);
      await client.post("log-server:5500", data).then(() =>{

      })
      .catch((error) =>{
            console.log(error);
      });
}
