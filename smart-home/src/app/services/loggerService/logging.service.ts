import { host, port } from '../../constants/backend-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LogModel} from '../../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private client: HttpClient) { }

  public getLogs(username:string, min: number, max : number) : Promise<LogModel[]>
  {
    if (username == null || username.length == 0)
    {
      console.error("Logs could not be get due to empty username. (see history-service/getLogs)");
    }

    if (min < 0)
    {
      console.error("Expected positive whole number or 0. (see history-service/getLogs)");
      return;
    }

    return this.client.get<LogModel[]>(host + port + '/logs/' + min + '/' + max).toPromise();
  }

  public async logError(username: string, message : string) : Promise<string>
  {
    if (username == null || username.length == 0)
    {
      console.error("Log could not be stored due to empty username. (see history-service/logError)");
    }

    if (message == "")
    {
      console.error("Log could not be stored due to empty message. (see history-service/logError)");
    }
    let date = new Date();
    let log = {user: username, date: date.toDateString(), time: date.toTimeString(), message: "ERROR: " + message};

    return this.client.post<LogModel>(host + port + '/logs', log).toPromise()
    .then(() => {
      return "Errorlog has been added.";
    })
    .catch(() => {
      return "Errorlog has not been added.";
    })
  }

  public async logInfo(username: string, message : string) : Promise<string>
  {
    if (username == null || username.length == 0)
    {
      console.error("Log could not be stored due to empty username. (see history-service/logInfo)");
    }

    if (message == "")
    {
      console.error("Log could not be stored due to empty message. (see history-service/logInfo)");
    }
    let date = new Date();
    let log = {user: username, date: date.toDateString(), time: date.toTimeString(), message: message};

    return this.client.post<LogModel>(host + port + '/logs', log).toPromise()
    .then(() => {
      return "Log has been added.";
    })
    .catch(() => {
      return "Log has not been added.";
    })
  }
}
