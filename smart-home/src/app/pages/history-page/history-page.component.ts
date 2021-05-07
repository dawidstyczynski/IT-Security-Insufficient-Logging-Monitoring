import { Component, OnInit } from '@angular/core';
import { UserRecord } from '../../models/userRecord';
import { LoggingService } from 'src/app/services/loggerService/logging.service';
import {HistoryModel} from '../../models/history.model';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RestUrl } from 'src/app/constants/rest-urls.enum';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  public logs : HistoryModel[];
  public rows: number;
  public first: number;

  constructor(private apiService : ApiService) { 
    this.rows = 25;
    this.first = 0;
  }

  ngOnInit(): void {
    this.apiService.GetData<HistoryModel[]>(RestUrl.History)
    .then(data =>{
      this.logs = data;
    }).catch((e) =>{
      console.debug("coudl not get history.");
    });
  }
}
