import { Component, Input, OnInit } from '@angular/core';
import * as hash from 'object-hash';
import { UserLoginService } from '../../services/login-service/user-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public newPW : string;
  @Input() public email: string;

  constructor(private loginService : UserLoginService) { 
    this.newPW = '';
    this.email = '';
  }

  ngOnInit(): void {
    this.email = this.GetUserEmail();
  }

  public ChangePassword() : void{
    if (this.newPW === '')
    {
      return;
    }

    this.loginService.ChangePassword(hash(this.newPW))
    .then((user) =>{
      console.log(user);
      this.newPW = '';
    })
    .catch((error) =>{
      console.log(error);
    });
  }

  public ChangeEmail(){
    if (this.email === '')
    {
      return;
    }

    this.loginService.ChangeEmail(this.email)
    .then((user) =>{
      this.email = user.email;
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  public GetUserName() : string{
    return this.loginService.getUserData().name;
  }

  public GetUserEmail():string{
    return this.loginService.getUserData().email;
  }
}
