import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { DevicesComponent } from './components/devices/devices.component';
import { HistoryComponent } from './components/history/history.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouteName } from './constants/route-name.enum';

const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate: [ReverseAuthGuard]},
  { path: RouteName.Login , component: LoginPageComponent, canActivate: [ReverseAuthGuard]},
  { path: RouteName.Register, component: RegisterPageComponent},

  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
