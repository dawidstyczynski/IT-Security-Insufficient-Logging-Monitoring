import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';
import * as hash from 'object-hash';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/constants/route-name.enum';
import { LoggingService } from 'src/app/services/loggerService/logging.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userName: string;
  public password: string;
  public showPassword: boolean = false;

  public loginDisabled : boolean = false;

  constructor(private loginService: UserLoginService, private router: Router, private logger : LoggingService) { 
    this.userName = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  public async HandleUserLogin()
  {
    this.loginDisabled = true;
    if (this.userName === "")
    {
      this.loginDisabled = false;
      return;
    }
      
    if (this.password === "")
    {
      this.loginDisabled = false;
      return;
    }
      
    await this.loginService.Login( {name: this.userName, password: hash(this.password), email: '', admin: false} )
    .then((user) =>{
      this.logger.logInfo(this.userName, "has logged in.").then((e) =>{
        console.debug(e);
      }).catch((e) =>{
        console.debug(e);
      });
      this.router.navigateByUrl(this.router.createUrlTree([RouteName.Devices]));
    })
    .catch((error) =>{
      console.debug(error);
    })
    .finally(() =>{
      this.loginDisabled = false;
    });
  }
}

