import { Component, OnInit } from '@angular/core';
import { UserRecord } from '../../../../../models/userRecord';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';
import {LogModel} from '../../../../../models/log.model';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  public logs : LogModel[];
  public rows: number;
  private user : UserRecord;

  constructor(private logger : LoggingService, private loginService : UserLoginService) { 
    this.rows = 25;
    /* this.user = this.loginService.getUserData(); */

    /*
    this.logger.getLogs(this.user, this.rows)
      .then(records => {
        this.logs = records;
      })
      .catch(error =>{
        console.error("Could not retrieve logs.");
      }) */

      /* test !!!! */
      let log : LogModel = {Id: null, User : "christian", Date: new Date(), Message: "has openend History."};
      this.logs = [log];
  }

  ngOnInit(): void {
  }

}
