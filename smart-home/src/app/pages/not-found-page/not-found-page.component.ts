import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/constants/route-name.enum';

@Component({
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private loginService : UserLoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public GoHome() : void{
    if(this.loginService.getUserData() === null)
    {
      this.router.navigateByUrl(this.router.createUrlTree([RouteName.Login]));
    }
    else
    {
      this.router.navigateByUrl(this.router.createUrlTree([RouteName.Devices]));
    }
  }
}
