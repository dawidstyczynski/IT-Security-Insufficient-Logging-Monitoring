import { Component, OnChanges, OnInit } from '@angular/core';
import { UserRecord } from '../../../../../models/userRecord';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';
import {LogModel} from '../../../../../models/log.model';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnChanges {

  public logs : LogModel[];
  public rows: number;
  public first: number;

  private user : UserRecord;

  constructor(private logger : LoggingService, private loginService : UserLoginService) { 
    this.rows = 25;
    this.first = 0;
  }

  ngOnInit(): void {
    this.logs = this.getHistory();
  }

  ngOnChanges() :void{
    let log : LogModel = {Id: null, User : "christian", Date: new Date(), Message: "has updated History."};
    var newLogs = this.getHistory();
    newLogs.push(log);
    this.logs = newLogs;
  }

  public getHistory() : LogModel[]
  {
    let log : LogModel = {Id: null, User : "christian", Date: new Date(), Message: "has openend History."};
    return [log];
    /* get entries from (first) to (first + rows) */
  }

}
