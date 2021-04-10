import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';
import { UserRecord } from '../../../../../models/userRecord';

@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit {

  private user : UserRecord;

  constructor(private loginService : UserLoginService) { 
    this.user = this.loginService.getUserData();
  }

  public getAdmin() : boolean{
    return this.user.admin;
  }

  ngOnInit(): void {
  }

}
