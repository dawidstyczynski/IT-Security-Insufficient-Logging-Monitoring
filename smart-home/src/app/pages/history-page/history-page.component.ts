import { Component, OnInit } from '@angular/core';
import { UserRecord } from '../../models/userRecord';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import {LogModel} from '../../models/log.model';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RestUrl } from 'src/app/constants/rest-urls.enum';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  public logs : LogModel[];
  public rows: number;
  public first: number;

  constructor(private logger : LoggingService, private apiService : ApiService) { 
    this.rows = 25;
    this.first = 0;
  }

  ngOnInit(): void {
    this.apiService.GetData<LogModel[]>(RestUrl.History)
    .then(data =>{
      this.logs = data;
    });
  }
}
