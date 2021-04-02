import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import * as hash from 'object-hash';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.password = hash(this.password);
    this.registerService.Register({name: this.userName, password: this.password, email: ''} )
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
