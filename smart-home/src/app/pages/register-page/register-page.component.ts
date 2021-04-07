import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import * as hash from 'object-hash';

import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public userName: string;
  public password: string;
  public showPassword: boolean = false;

  public signUpDisabled : boolean = false;

  constructor(private registerService: UserLoginService, private router: Router) {
    
   }

  ngOnInit(): void {
  }

  public HandleUserRegister()
  {
    this.signUpDisabled = true;
    this.registerService.Register({name: this.userName, password: hash(this.password), email: ''} )
    .then((user) =>{
      console.log('User is now registered.');
      this.router.navigateByUrl(this.router.createUrlTree(['login']));
    })
    .catch((error) =>{
      console.log(error);
    })
    .finally(() =>{
      this.signUpDisabled = false;
    });
  }
}
