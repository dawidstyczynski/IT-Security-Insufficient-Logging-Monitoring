import { host, port } from '../../constants/backend-config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HistoryModel} from '../../models/history.model';
import { RestUrl } from 'src/app/constants/rest-urls.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private readonly backend = host + port;

  constructor(private client: HttpClient) { }

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
    let log = new HistoryModel(username, new Date(), "ERROR: " + message);

    return this.client.post<HistoryModel>(this.backend + RestUrl.History, log).toPromise()
    .then(() => {
      return "Errorlog has been added.";
    })
    .catch(() => {
      return "Errorlog has not been added.";
    })
  }

  public async logInfo(username: string, message : string) : Promise<string>
  {
    if (username == null || username.replace(' ', '').length == 0)
    {
      console.debug("Log could not be stored due to empty username. (see history-service/logInfo)");
    }

    if (message.replace(' ', '').length == 0)
    {
      console.debug("Log could not be stored due to empty message. (see history-service/logInfo)");
    }
    let log = new HistoryModel(username, new Date(), message);

    return this.client.post<HistoryModel>(this.backend + RestUrl.History , log).toPromise()
    .then(() => {
      return "Log has been added.";
    })
    .catch(() => {
      return "Log has not been added.";
    })
  }
}
