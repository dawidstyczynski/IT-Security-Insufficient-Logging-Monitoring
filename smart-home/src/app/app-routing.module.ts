import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouteName } from './constants/route-name.enum';
import { DevicesPageComponent } from './pages/devices-page/devices-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate: [ReverseAuthGuard]},
  { path: RouteName.Login , component: LoginPageComponent, canActivate: [ReverseAuthGuard]},
  
  { path: RouteName.Register, component: RegisterPageComponent },

  { path: RouteName.Devices, component: DevicesPageComponent, canActivate: [AuthGuard] },
  { path: RouteName.Config, component: ConfigurationPageComponent, canActivate: [AuthGuard] },
  { path: RouteName.Logs, component: HistoryPageComponent, canActivate: [AuthGuard] },

  // '**' must come last!
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
