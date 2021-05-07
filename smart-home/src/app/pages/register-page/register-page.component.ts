import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/login-service/user-login.service';
import * as hash from 'object-hash';

import { Router } from '@angular/router';
import { LoggingService } from 'src/app/services/loggerService/logging.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public userName: string;
  public password: string;
  public showPassword: boolean = false;
  public admin: boolean = false;

  public signUpDisabled : boolean = false;

  constructor(private registerService: UserLoginService, private logger: LoggingService, private router: Router) {
    
   }

  ngOnInit(): void {
  }

  public HandleUserRegister()
  {
    this.signUpDisabled = true;
    this.registerService.Register({name: this.userName, password: hash(this.password), email: '', admin: this.admin} )
    .then((user) =>{

      this.admin ? this.logger.logInfo(this.userName, 'is a new admin.') : this.logger.logInfo(this.userName, 'is a new user.');

      this.router.navigateByUrl(this.router.createUrlTree(['login']));
    })
    .catch((error) =>{
      console.debug(error);
    })
    .finally(() =>{
      this.signUpDisabled = false;
    });
  }
}
