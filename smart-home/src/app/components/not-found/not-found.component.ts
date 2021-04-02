import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private loginService : UserLoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public GoHome() : void{
    if(this.loginService.getUserData() === null)
    {
      this.router.navigateByUrl(this.router.createUrlTree(['login']));
    }
    else
    {
      this.router.navigateByUrl(this.router.createUrlTree(['lib']));
    }
  }
}
