import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import * as hash from 'object-hash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  public showPassword: boolean = false;

  public loginDisabled : boolean = false;

  constructor(private loginService: UserLoginService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  public async HandleUserLogin()
  {
    this.loginDisabled = true;
    if (this.userName === '')
    {
      this.loginDisabled = false;
      return;
    }
      
    if (this.password === '')
    {
      this.loginDisabled = false;
      return;
    }
      
    await this.loginService.Login( {name: this.userName, password: hash(this.password), email: ''} )
    .then((user) =>{
      this.router.navigateByUrl(this.router.createUrlTree(['devices']));
    })
    .catch((error) =>{
      console.log(error);
    })
    .finally(() =>{
      this.loginDisabled = false;
    });
  }
}
