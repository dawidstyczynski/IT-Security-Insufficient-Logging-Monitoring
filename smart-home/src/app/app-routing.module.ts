import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { DevicesComponent } from './components/devices/devices.component';
import { HistoryComponent } from './components/history/history.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [ReverseAuthGuard]},
  { path: 'login' , component: LoginComponent, canActivate: [ReverseAuthGuard]},
  { path: 'register', component: RegisterComponent},

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
